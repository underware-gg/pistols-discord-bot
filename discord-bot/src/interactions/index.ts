import * as duels from './duels.js';
import * as settings from './settings.js';

export const button_interactions = [
  duels.duelist_duels,
  duels.past_duels,
  settings.settings_challenges_notifications,
  settings.settings_new_duelist_notifications,
  settings.settings_duelists_turn_notifications,
];

export const select_menu_interactions = [
  settings.settings_channel,
];
