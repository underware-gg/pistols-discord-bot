import { Listener, container } from '@sapphire/framework';
import { ColorResolvable, EmbedBuilder, PermissionFlagsBits, type Message } from 'discord.js';
import { bigintToAddress, bigintToDecimal } from '@underware/pistols-sdk/utils';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';
import { callToChallengeSub } from '../pistols/callToChallengeSub.js';
import { PlayerSettings } from '../lib/client.js';
import { parseEnumVariant } from '@underware/pistols-sdk/starknet';
import { get_opponent, Opponent } from '../pistols/get_opponent.js';
import { COLORS } from '@underware/pistols-sdk/pistols/constants';

const _eventName = 'CallToChallengeEvent';

export class CallToChallengeEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: container.pistols_emitter,
      event: _eventName
    });
    this.container.logger.info(`[start] CallToChallengeEventListener...`);
    callToChallengeSub(this.container.sdk, container.pistols_emitter, _eventName).then((sub) => {
      this.sub = sub;
    });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(callToChallenge: models.CallToChallengeEvent) {
    const playerAddress = bigintToAddress(callToChallenge.player_address);
    const action = parseEnumVariant<constants.ChallengeAction>(callToChallenge.action);
    const duelId = bigintToDecimal(callToChallenge.duel_id);
    if (action === constants.ChallengeAction.Waiting) {
      this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: ...`);
      return;
    }
    //
    // find player social link
    const socialLink: models.PlayerSocialLinkEvent | undefined = this.container.pistols_players[playerAddress];
    if (!socialLink) {
      this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: unlinked player`);
      return;
    }
    // check opt-out
    const settings: PlayerSettings = this.container.pistols_settings[playerAddress] ?? {};
    if (settings[constants.PlayerSetting.OptOutNotifications] === true) {
      this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: opted out`);
      return;
    }
    this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: message to [${socialLink.user_name}]`);
    //
    // build message
    const opponent: Opponent = await get_opponent(playerAddress, duelId);
    let color: ColorResolvable = COLORS.MEDIUM as ColorResolvable;
    let url: string;
    let message: string;
    if (action === constants.ChallengeAction.Reply) {
      url = `${this.container.networkConfig.clientUrl}/tavern?duel=${duelId}`;
      message = `You have been challenged to a duel by ${opponent.formattedName}!`;
      color = COLORS.WARNING as ColorResolvable; // yellow
    } else {
      url = `${this.container.networkConfig.clientUrl}/duel/${duelId}`;
      if (ResolvedChallengeStates.includes(opponent.challenge_state as constants.ChallengeState)) {
        message = `A duel against ${opponent.formattedName} has been resolved!`;
        color = COLORS.POSITIVE as ColorResolvable; // green
      } else if (CanceledChallengeStates.includes(opponent.challenge_state as constants.ChallengeState)) {
        message = `A duel against ${opponent.formattedName} has been canceled!`;
        color = COLORS.NEGATIVE as ColorResolvable; // red
      } else {
        message = `You are required to **${action}** this duel against ${opponent.formattedName}`;
      }
    }

    // https://discordjs.guide/popular-topics/embeds.html
    // https://discord.js.org/docs/packages/discord.js/14.20.0/EmbedBuilder:Class
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(`Duel #${duelId}`)
      .setURL(url)
      .setDescription(`${message}\n${url}`)
      .setThumbnail(opponent.avatar ?? this.container.pistols_assets.logo)
      .setFooter({ text: `Opt-out DMs in settings at ${this.container.networkConfig.clientUrl}`, iconURL: this.container.pistols_assets.logo })
      .setTimestamp();
    this.container.client.users.send(socialLink.user_id, { embeds: [embed] });
  }
}

const ResolvedChallengeStates: constants.ChallengeState[] = [
  constants.ChallengeState.Resolved,
  constants.ChallengeState.Draw,
];
const CanceledChallengeStates: constants.ChallengeState[] = [
  constants.ChallengeState.Refused,
  constants.ChallengeState.Withdrawn,
  constants.ChallengeState.Expired,
];
