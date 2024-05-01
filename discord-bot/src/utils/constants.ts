export enum ChallengeState {
  Null,
  Awaiting, // 1
  Withdrawn, // 2
  Refused, // 3
  Expired, // 4
  InProgress, // 5
  Resolved, // 6
  Draw, // 7
  All, // 8
}

export enum Colors {
  Darkest = '#201a18',
  Dark = '#584f49',
  Medium = '#ef9758',
  Bright = '#c8b6a8',
  Brightest = '#efe1d7',
  Positive = '#21ba45',
  Negative = '#db2828',
  Warning = '#f2c037',
}

export enum EventName {
  DuelistRegistered = 'DuelistRegistered',
  NewChallengeEvent = 'NewChallengeEvent',
  ChallengeAcceptedEvent = 'ChallengeAcceptedEvent',
  DuelistTurnEvent = 'DuelistTurnEvent',
}

export const EventKeys = {
  [EventName.DuelistRegistered]: '0x1afe932323a4032d23a471be00bb333912509b20609983ac2159aa2394f9e5f',
  [EventName.NewChallengeEvent]: '0x14a0df74df51e02ef8dedabfd1ea9684ea2087bed6370e881b156d7e2e56975',
  [EventName.ChallengeAcceptedEvent]: '0x31cdbf7ac39747303190a727df1a270ae5e4f05191f6f58e452ce4eb1e98abe',
  [EventName.DuelistTurnEvent]: '0x19556e1418f1e7a7e6962eff75d1a46abd50bda431139f855ba85c9119754a4',
}
