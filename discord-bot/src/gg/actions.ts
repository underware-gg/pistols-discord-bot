import { pushActions } from './push.js';

export class ActionsPerPlayer {
  actions: Record<string, string[]> = {};

  constructor() {
    this.actions = {};
  }

  append(address: string, action: string) {
    if (!this.actions[address]) {
      this.actions[address] = [];
    }
    this.actions[address].push(action);
  }

  push() {
    Object.entries(this.actions).forEach(([address, actions]) => {
      pushActions({ address, actions });
    });
  }
}
