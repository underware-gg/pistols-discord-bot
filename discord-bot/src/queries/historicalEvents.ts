import { SDK } from '@dojoengine/sdk/node';
import { PistolsSchemaType, PistolsEntity, PistolsHistoricalQueryBuilder, PistolsToriiResponse } from '@underware/pistols-sdk/pistols/node';
import { feltToString, parseEnumVariant } from '@underware/pistols-sdk/starknet';
import { bigintEquals, bigintToAddress } from '@underware/pistols-sdk/utils';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import { ActionsPerPlayer } from '../gg/actions.js';
import { getChallenge } from './getChallenge.js';

export const historicalEventsListener = async (sdk: SDK<PistolsSchemaType>) => {

  async function onEntityUpdated({ data, error }: { data: PistolsEntity[]; error: Error | null }) {
    if (error) {
      console.error(error);
      return;
    }

    // actions to submit
    const actionsPerPlayer = new ActionsPerPlayer();

    // console.log(`--- SUB data:`, data);
    const entity = data.pop();
    if (entity && entity.entityId !== '0x0') {
      console.log(`--- HISTORICAL got:`, Object.keys(entity.models.pistols ?? {}));

      // activity events
      // {
      //   is_public: true,
      //   player_address: "0x057c54434905c896cc163358a9057f91b5e3e6a4f60b5a4bef3fdd77c2dc91aa",
      //   activity: "MovesRevealed",
      //   timestamp: 1746824284,
      //   identifier: "0x00000000000000000000000000000000000000000000000000000000000000e4",
      // }
      const activity = entity.models?.pistols?.PlayerActivityEvent as models.PlayerActivityEvent;
      if (activity) {
        const action_id = parseEnumVariant<constants.Activity>(activity.activity);
        console.log(`--- HISTORICAL PlayerActivityEvent: [${action_id}]`, activity);
        if (action_id === constants.Activity.TutorialFinished) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Finish Tutorial');
        }
        if (action_id === constants.Activity.PackStarter) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Claim Starter Pack');
        }
        if (action_id === constants.Activity.PackOpened) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Open a Duelist Pack');
        }
        if (action_id === constants.Activity.ChallengeCreated) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Challenge to a Duel');
        }
        if (action_id === constants.Activity.ChallengeReplied) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Accept a Challenge');
        }
        if (action_id === constants.Activity.DuelistDied) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Death of a Duelist');
        }
        if (action_id === constants.Activity.ChallengeResolved) {
          actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Win A Duel');
        }
        // if (action_id === constants.Activity.ClaimedGift) {
        //   actionsPerPlayer.append(bigintToAddress(activity.player_address), 'Claim a Gift');
        // }
      }

      // trophy progression events
      // {
      //   task_id: "0x000000000000000000000000000000000000000050657266656374446f646765",
      //   time: 1746824284,
      //   player_id: "0x0256d696f908f2748efcc6931c1bca88f269394ab80b91c691d7916f04af3d8c",
      //   count: 1,
      // }
      const progression = entity.models?.pistols?.TrophyProgression as models.TrophyProgression;
      if (progression) {
        const action_id = feltToString(progression.task_id);
        console.log(`--- HISTORICAL TrophyProgression [${action_id}]`, progression);
        if (action_id === 'PerfectDodge') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Perfect Dodge');
        }
        if (action_id === 'DodgeAndKill') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Dodge and Kill');
        }
        if (action_id === 'ShotInTheBack') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Shot in the Back');
        }
        if (action_id === 'ShotAtTheBack') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Shot at the Back');
        }
        if (action_id === 'BloodBath') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Blood Bath');
        }
        if (action_id === 'Seppuku') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Commit Seppuku');
        }
        if (action_id === 'DoubleSeppuku') {
          actionsPerPlayer.append(bigintToAddress(progression.player_id), 'Double Seppuku');
        }
      }
    }

    // push actions to gg
    actionsPerPlayer.push();
  }

  const query: PistolsHistoricalQueryBuilder = new PistolsHistoricalQueryBuilder()
    .withEntityModels([
      'pistols-PlayerActivityEvent',
      'pistols-TrophyProgression',
    ])
    .withDirection('Backward')
    .withLimit(1)

  //@ts-ignore
  const events: PistolsToriiResponse = await sdk.getEventMessages({
    query: query,
  });
  const items: PistolsEntity[] = events.getItems();
  console.log(`Historical intitial events [${items.length}]`);

  const [entities, sub] = await sdk.subscribeEventQuery({
    query,
    //@ts-ignore
    callback: onEntityUpdated,
  });

  return sub;
};
