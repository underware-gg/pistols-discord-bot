import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u16: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
  u128: { input: any; output: any; }
  u256: { input: any; output: any; }
};

export type Challenge = {
  __typename?: 'Challenge';
  duel_id?: Maybe<Scalars['u128']['output']>;
  duelist_a?: Maybe<Scalars['ContractAddress']['output']>;
  duelist_b?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  message?: Maybe<Scalars['felt252']['output']>;
  round_number?: Maybe<Scalars['u8']['output']>;
  state?: Maybe<Scalars['u8']['output']>;
  table_id?: Maybe<Scalars['felt252']['output']>;
  timestamp_end?: Maybe<Scalars['u64']['output']>;
  timestamp_start?: Maybe<Scalars['u64']['output']>;
  winner?: Maybe<Scalars['u8']['output']>;
};

export type ChallengeConnection = {
  __typename?: 'ChallengeConnection';
  edges?: Maybe<Array<Maybe<ChallengeEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ChallengeEdge = {
  __typename?: 'ChallengeEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Challenge>;
};

export type ChallengeOrder = {
  direction: OrderDirection;
  field: ChallengeOrderField;
};

export enum ChallengeOrderField {
  DuelistA = 'DUELIST_A',
  DuelistB = 'DUELIST_B',
  DuelId = 'DUEL_ID',
  Message = 'MESSAGE',
  RoundNumber = 'ROUND_NUMBER',
  State = 'STATE',
  TableId = 'TABLE_ID',
  TimestampEnd = 'TIMESTAMP_END',
  TimestampStart = 'TIMESTAMP_START',
  Winner = 'WINNER'
}

export type ChallengeWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idLIKE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
  duelist_a?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  duelist_aLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  duelist_aNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_b?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  duelist_bLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  duelist_bNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  message?: InputMaybe<Scalars['felt252']['input']>;
  messageEQ?: InputMaybe<Scalars['felt252']['input']>;
  messageGT?: InputMaybe<Scalars['felt252']['input']>;
  messageGTE?: InputMaybe<Scalars['felt252']['input']>;
  messageIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  messageLIKE?: InputMaybe<Scalars['felt252']['input']>;
  messageLT?: InputMaybe<Scalars['felt252']['input']>;
  messageLTE?: InputMaybe<Scalars['felt252']['input']>;
  messageNEQ?: InputMaybe<Scalars['felt252']['input']>;
  messageNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  messageNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  round_number?: InputMaybe<Scalars['u8']['input']>;
  round_numberEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberGT?: InputMaybe<Scalars['u8']['input']>;
  round_numberGTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  round_numberLIKE?: InputMaybe<Scalars['u8']['input']>;
  round_numberLT?: InputMaybe<Scalars['u8']['input']>;
  round_numberLTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberNEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  round_numberNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  state?: InputMaybe<Scalars['u8']['input']>;
  stateEQ?: InputMaybe<Scalars['u8']['input']>;
  stateGT?: InputMaybe<Scalars['u8']['input']>;
  stateGTE?: InputMaybe<Scalars['u8']['input']>;
  stateIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  stateLIKE?: InputMaybe<Scalars['u8']['input']>;
  stateLT?: InputMaybe<Scalars['u8']['input']>;
  stateLTE?: InputMaybe<Scalars['u8']['input']>;
  stateNEQ?: InputMaybe<Scalars['u8']['input']>;
  stateNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  stateNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  table_id?: InputMaybe<Scalars['felt252']['input']>;
  table_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idGT?: InputMaybe<Scalars['felt252']['input']>;
  table_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idLIKE?: InputMaybe<Scalars['felt252']['input']>;
  table_idLT?: InputMaybe<Scalars['felt252']['input']>;
  table_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  timestamp_end?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endGT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endGTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestamp_endLIKE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endLT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endLTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endNEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestamp_endNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_start?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startGT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startGTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestamp_startLIKE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startLT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startLTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startNEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestamp_startNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  winner?: InputMaybe<Scalars['u8']['input']>;
  winnerEQ?: InputMaybe<Scalars['u8']['input']>;
  winnerGT?: InputMaybe<Scalars['u8']['input']>;
  winnerGTE?: InputMaybe<Scalars['u8']['input']>;
  winnerIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  winnerLIKE?: InputMaybe<Scalars['u8']['input']>;
  winnerLT?: InputMaybe<Scalars['u8']['input']>;
  winnerLTE?: InputMaybe<Scalars['u8']['input']>;
  winnerNEQ?: InputMaybe<Scalars['u8']['input']>;
  winnerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  winnerNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
};

export type Chances = {
  __typename?: 'Chances';
  crit_bonus?: Maybe<Scalars['u8']['output']>;
  crit_chances?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<World__Entity>;
  hit_bonus?: Maybe<Scalars['u8']['output']>;
  hit_chances?: Maybe<Scalars['u8']['output']>;
  key?: Maybe<Scalars['felt252']['output']>;
  lethal_bonus?: Maybe<Scalars['u8']['output']>;
  lethal_chances?: Maybe<Scalars['u8']['output']>;
};

export type ChancesConnection = {
  __typename?: 'ChancesConnection';
  edges?: Maybe<Array<Maybe<ChancesEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ChancesEdge = {
  __typename?: 'ChancesEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Chances>;
};

export type ChancesOrder = {
  direction: OrderDirection;
  field: ChancesOrderField;
};

export enum ChancesOrderField {
  CritBonus = 'CRIT_BONUS',
  CritChances = 'CRIT_CHANCES',
  HitBonus = 'HIT_BONUS',
  HitChances = 'HIT_CHANCES',
  Key = 'KEY',
  LethalBonus = 'LETHAL_BONUS',
  LethalChances = 'LETHAL_CHANCES'
}

export type ChancesWhereInput = {
  crit_bonus?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusEQ?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusGT?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusGTE?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  crit_bonusLIKE?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusLT?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusLTE?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusNEQ?: InputMaybe<Scalars['u8']['input']>;
  crit_bonusNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  crit_bonusNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  crit_chances?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesEQ?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesGT?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesGTE?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  crit_chancesLIKE?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesLT?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesLTE?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesNEQ?: InputMaybe<Scalars['u8']['input']>;
  crit_chancesNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  crit_chancesNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  hit_bonus?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusEQ?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusGT?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusGTE?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  hit_bonusLIKE?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusLT?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusLTE?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusNEQ?: InputMaybe<Scalars['u8']['input']>;
  hit_bonusNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  hit_bonusNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  hit_chances?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesEQ?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesGT?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesGTE?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  hit_chancesLIKE?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesLT?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesLTE?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesNEQ?: InputMaybe<Scalars['u8']['input']>;
  hit_chancesNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  hit_chancesNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  key?: InputMaybe<Scalars['felt252']['input']>;
  keyEQ?: InputMaybe<Scalars['felt252']['input']>;
  keyGT?: InputMaybe<Scalars['felt252']['input']>;
  keyGTE?: InputMaybe<Scalars['felt252']['input']>;
  keyIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  keyLIKE?: InputMaybe<Scalars['felt252']['input']>;
  keyLT?: InputMaybe<Scalars['felt252']['input']>;
  keyLTE?: InputMaybe<Scalars['felt252']['input']>;
  keyNEQ?: InputMaybe<Scalars['felt252']['input']>;
  keyNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  keyNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  lethal_bonus?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusEQ?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusGT?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusGTE?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lethal_bonusLIKE?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusLT?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusLTE?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusNEQ?: InputMaybe<Scalars['u8']['input']>;
  lethal_bonusNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lethal_bonusNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  lethal_chances?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesEQ?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesGT?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesGTE?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lethal_chancesLIKE?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesLT?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesLTE?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesNEQ?: InputMaybe<Scalars['u8']['input']>;
  lethal_chancesNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lethal_chancesNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
};

export type Config = {
  __typename?: 'Config';
  entity?: Maybe<World__Entity>;
  initialized?: Maybe<Scalars['bool']['output']>;
  key?: Maybe<Scalars['u8']['output']>;
  owner_address?: Maybe<Scalars['ContractAddress']['output']>;
  paused?: Maybe<Scalars['bool']['output']>;
  treasury_address?: Maybe<Scalars['ContractAddress']['output']>;
};

export type ConfigConnection = {
  __typename?: 'ConfigConnection';
  edges?: Maybe<Array<Maybe<ConfigEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ConfigEdge = {
  __typename?: 'ConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Config>;
};

export type ConfigOrder = {
  direction: OrderDirection;
  field: ConfigOrderField;
};

export enum ConfigOrderField {
  Initialized = 'INITIALIZED',
  Key = 'KEY',
  OwnerAddress = 'OWNER_ADDRESS',
  Paused = 'PAUSED',
  TreasuryAddress = 'TREASURY_ADDRESS'
}

export type ConfigWhereInput = {
  initialized?: InputMaybe<Scalars['bool']['input']>;
  key?: InputMaybe<Scalars['u8']['input']>;
  keyEQ?: InputMaybe<Scalars['u8']['input']>;
  keyGT?: InputMaybe<Scalars['u8']['input']>;
  keyGTE?: InputMaybe<Scalars['u8']['input']>;
  keyIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  keyLIKE?: InputMaybe<Scalars['u8']['input']>;
  keyLT?: InputMaybe<Scalars['u8']['input']>;
  keyLTE?: InputMaybe<Scalars['u8']['input']>;
  keyNEQ?: InputMaybe<Scalars['u8']['input']>;
  keyNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  keyNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  owner_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  owner_addressLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  owner_addressNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  paused?: InputMaybe<Scalars['bool']['input']>;
  treasury_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  treasury_addressLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  treasury_addressNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Duelist = {
  __typename?: 'Duelist';
  address?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  profile_pic?: Maybe<Scalars['u8']['output']>;
  score?: Maybe<Duelist_Score>;
  timestamp?: Maybe<Scalars['u64']['output']>;
};

export type DuelistConnection = {
  __typename?: 'DuelistConnection';
  edges?: Maybe<Array<Maybe<DuelistEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DuelistEdge = {
  __typename?: 'DuelistEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Duelist>;
};

export type DuelistOrder = {
  direction: OrderDirection;
  field: DuelistOrderField;
};

export enum DuelistOrderField {
  Address = 'ADDRESS',
  Name = 'NAME',
  ProfilePic = 'PROFILE_PIC',
  Score = 'SCORE',
  Timestamp = 'TIMESTAMP'
}

export type DuelistWhereInput = {
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  addressLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  addressNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  profile_pic?: InputMaybe<Scalars['u8']['input']>;
  profile_picEQ?: InputMaybe<Scalars['u8']['input']>;
  profile_picGT?: InputMaybe<Scalars['u8']['input']>;
  profile_picGTE?: InputMaybe<Scalars['u8']['input']>;
  profile_picIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  profile_picLIKE?: InputMaybe<Scalars['u8']['input']>;
  profile_picLT?: InputMaybe<Scalars['u8']['input']>;
  profile_picLTE?: InputMaybe<Scalars['u8']['input']>;
  profile_picNEQ?: InputMaybe<Scalars['u8']['input']>;
  profile_picNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  profile_picNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  timestamp?: InputMaybe<Scalars['u64']['input']>;
  timestampEQ?: InputMaybe<Scalars['u64']['input']>;
  timestampGT?: InputMaybe<Scalars['u64']['input']>;
  timestampGTE?: InputMaybe<Scalars['u64']['input']>;
  timestampIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestampLIKE?: InputMaybe<Scalars['u64']['input']>;
  timestampLT?: InputMaybe<Scalars['u64']['input']>;
  timestampLTE?: InputMaybe<Scalars['u64']['input']>;
  timestampNEQ?: InputMaybe<Scalars['u64']['input']>;
  timestampNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestampNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
};

export type Duelist_Score = {
  __typename?: 'Duelist_Score';
  honour?: Maybe<Scalars['u8']['output']>;
  level_lord?: Maybe<Scalars['u8']['output']>;
  level_trickster?: Maybe<Scalars['u8']['output']>;
  level_villain?: Maybe<Scalars['u8']['output']>;
  total_draws?: Maybe<Scalars['u16']['output']>;
  total_duels?: Maybe<Scalars['u16']['output']>;
  total_honour?: Maybe<Scalars['u32']['output']>;
  total_losses?: Maybe<Scalars['u16']['output']>;
  total_wins?: Maybe<Scalars['u16']['output']>;
};

export type Erc20AllowanceModel = {
  __typename?: 'ERC20AllowanceModel';
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  spender?: Maybe<Scalars['ContractAddress']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc20AllowanceModelConnection = {
  __typename?: 'ERC20AllowanceModelConnection';
  edges?: Maybe<Array<Maybe<Erc20AllowanceModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20AllowanceModelEdge = {
  __typename?: 'ERC20AllowanceModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20AllowanceModel>;
};

export type Erc20AllowanceModelOrder = {
  direction: OrderDirection;
  field: Erc20AllowanceModelOrderField;
};

export enum Erc20AllowanceModelOrderField {
  Amount = 'AMOUNT',
  Owner = 'OWNER',
  Spender = 'SPENDER',
  Token = 'TOKEN'
}

export type Erc20AllowanceModelWhereInput = {
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  amountLIKE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  amountNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  amountNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spender?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  spenderLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  spenderNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20BalanceModel = {
  __typename?: 'ERC20BalanceModel';
  account?: Maybe<Scalars['ContractAddress']['output']>;
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc20BalanceModelConnection = {
  __typename?: 'ERC20BalanceModelConnection';
  edges?: Maybe<Array<Maybe<Erc20BalanceModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20BalanceModelEdge = {
  __typename?: 'ERC20BalanceModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20BalanceModel>;
};

export type Erc20BalanceModelOrder = {
  direction: OrderDirection;
  field: Erc20BalanceModelOrderField;
};

export enum Erc20BalanceModelOrderField {
  Account = 'ACCOUNT',
  Amount = 'AMOUNT',
  Token = 'TOKEN'
}

export type Erc20BalanceModelWhereInput = {
  account?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  accountLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  accountNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  amountLIKE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  amountNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  amountNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20MetadataModel = {
  __typename?: 'ERC20MetadataModel';
  decimals?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  symbol?: Maybe<Scalars['felt252']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
  total_supply?: Maybe<Scalars['u256']['output']>;
};

export type Erc20MetadataModelConnection = {
  __typename?: 'ERC20MetadataModelConnection';
  edges?: Maybe<Array<Maybe<Erc20MetadataModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20MetadataModelEdge = {
  __typename?: 'ERC20MetadataModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20MetadataModel>;
};

export type Erc20MetadataModelOrder = {
  direction: OrderDirection;
  field: Erc20MetadataModelOrderField;
};

export enum Erc20MetadataModelOrderField {
  Decimals = 'DECIMALS',
  Name = 'NAME',
  Symbol = 'SYMBOL',
  Token = 'TOKEN',
  TotalSupply = 'TOTAL_SUPPLY'
}

export type Erc20MetadataModelWhereInput = {
  decimals?: InputMaybe<Scalars['u8']['input']>;
  decimalsEQ?: InputMaybe<Scalars['u8']['input']>;
  decimalsGT?: InputMaybe<Scalars['u8']['input']>;
  decimalsGTE?: InputMaybe<Scalars['u8']['input']>;
  decimalsIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  decimalsLIKE?: InputMaybe<Scalars['u8']['input']>;
  decimalsLT?: InputMaybe<Scalars['u8']['input']>;
  decimalsLTE?: InputMaybe<Scalars['u8']['input']>;
  decimalsNEQ?: InputMaybe<Scalars['u8']['input']>;
  decimalsNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  decimalsNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  symbol?: InputMaybe<Scalars['felt252']['input']>;
  symbolEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolGT?: InputMaybe<Scalars['felt252']['input']>;
  symbolGTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  symbolLIKE?: InputMaybe<Scalars['felt252']['input']>;
  symbolLT?: InputMaybe<Scalars['felt252']['input']>;
  symbolLTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolNEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  symbolNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  total_supply?: InputMaybe<Scalars['u256']['input']>;
  total_supplyEQ?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  total_supplyLIKE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyNEQ?: InputMaybe<Scalars['u256']['input']>;
  total_supplyNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  total_supplyNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
};

export type InitializableModel = {
  __typename?: 'InitializableModel';
  entity?: Maybe<World__Entity>;
  initialized?: Maybe<Scalars['bool']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type InitializableModelConnection = {
  __typename?: 'InitializableModelConnection';
  edges?: Maybe<Array<Maybe<InitializableModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type InitializableModelEdge = {
  __typename?: 'InitializableModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<InitializableModel>;
};

export type InitializableModelOrder = {
  direction: OrderDirection;
  field: InitializableModelOrderField;
};

export enum InitializableModelOrderField {
  Initialized = 'INITIALIZED',
  Token = 'TOKEN'
}

export type InitializableModelWhereInput = {
  initialized?: InputMaybe<Scalars['bool']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  tokenNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type ModelUnion = Challenge | Chances | Config | Duelist | Erc20AllowanceModel | Erc20BalanceModel | Erc20MetadataModel | InitializableModel | Pact | Round | Scoreboard | Snapshot | TTable | Wager;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Pact = {
  __typename?: 'Pact';
  duel_id?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<World__Entity>;
  pair?: Maybe<Scalars['u128']['output']>;
};

export type PactConnection = {
  __typename?: 'PactConnection';
  edges?: Maybe<Array<Maybe<PactEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PactEdge = {
  __typename?: 'PactEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pact>;
};

export type PactOrder = {
  direction: OrderDirection;
  field: PactOrderField;
};

export enum PactOrderField {
  DuelId = 'DUEL_ID',
  Pair = 'PAIR'
}

export type PactWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idLIKE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
  pair?: InputMaybe<Scalars['u128']['input']>;
  pairEQ?: InputMaybe<Scalars['u128']['input']>;
  pairGT?: InputMaybe<Scalars['u128']['input']>;
  pairGTE?: InputMaybe<Scalars['u128']['input']>;
  pairIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  pairLIKE?: InputMaybe<Scalars['u128']['input']>;
  pairLT?: InputMaybe<Scalars['u128']['input']>;
  pairLTE?: InputMaybe<Scalars['u128']['input']>;
  pairNEQ?: InputMaybe<Scalars['u128']['input']>;
  pairNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  pairNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
};

export type Round = {
  __typename?: 'Round';
  duel_id?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<World__Entity>;
  round_number?: Maybe<Scalars['u8']['output']>;
  shot_a?: Maybe<Round_Shot>;
  shot_b?: Maybe<Round_Shot>;
  state?: Maybe<Scalars['u8']['output']>;
};

export type RoundConnection = {
  __typename?: 'RoundConnection';
  edges?: Maybe<Array<Maybe<RoundEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoundEdge = {
  __typename?: 'RoundEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Round>;
};

export type RoundOrder = {
  direction: OrderDirection;
  field: RoundOrderField;
};

export enum RoundOrderField {
  DuelId = 'DUEL_ID',
  RoundNumber = 'ROUND_NUMBER',
  ShotA = 'SHOT_A',
  ShotB = 'SHOT_B',
  State = 'STATE'
}

export type RoundWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idLIKE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
  round_number?: InputMaybe<Scalars['u8']['input']>;
  round_numberEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberGT?: InputMaybe<Scalars['u8']['input']>;
  round_numberGTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  round_numberLIKE?: InputMaybe<Scalars['u8']['input']>;
  round_numberLT?: InputMaybe<Scalars['u8']['input']>;
  round_numberLTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberNEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  round_numberNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  state?: InputMaybe<Scalars['u8']['input']>;
  stateEQ?: InputMaybe<Scalars['u8']['input']>;
  stateGT?: InputMaybe<Scalars['u8']['input']>;
  stateGTE?: InputMaybe<Scalars['u8']['input']>;
  stateIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  stateLIKE?: InputMaybe<Scalars['u8']['input']>;
  stateLT?: InputMaybe<Scalars['u8']['input']>;
  stateLTE?: InputMaybe<Scalars['u8']['input']>;
  stateNEQ?: InputMaybe<Scalars['u8']['input']>;
  stateNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  stateNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
};

export type Round_Shot = {
  __typename?: 'Round_Shot';
  action?: Maybe<Scalars['u16']['output']>;
  block?: Maybe<Scalars['u8']['output']>;
  chance_crit?: Maybe<Scalars['u8']['output']>;
  chance_hit?: Maybe<Scalars['u8']['output']>;
  damage?: Maybe<Scalars['u8']['output']>;
  dice_crit?: Maybe<Scalars['u8']['output']>;
  dice_hit?: Maybe<Scalars['u8']['output']>;
  hash?: Maybe<Scalars['u64']['output']>;
  health?: Maybe<Scalars['u8']['output']>;
  honour?: Maybe<Scalars['u8']['output']>;
  salt?: Maybe<Scalars['u64']['output']>;
  wager?: Maybe<Scalars['u8']['output']>;
  win?: Maybe<Scalars['u8']['output']>;
};

export type Scoreboard = {
  __typename?: 'Scoreboard';
  address?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  score?: Maybe<Scoreboard_Score>;
  table_id?: Maybe<Scalars['felt252']['output']>;
  wager_lost?: Maybe<Scalars['u256']['output']>;
  wager_won?: Maybe<Scalars['u256']['output']>;
};

export type ScoreboardConnection = {
  __typename?: 'ScoreboardConnection';
  edges?: Maybe<Array<Maybe<ScoreboardEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ScoreboardEdge = {
  __typename?: 'ScoreboardEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Scoreboard>;
};

export type ScoreboardOrder = {
  direction: OrderDirection;
  field: ScoreboardOrderField;
};

export enum ScoreboardOrderField {
  Address = 'ADDRESS',
  Score = 'SCORE',
  TableId = 'TABLE_ID',
  WagerLost = 'WAGER_LOST',
  WagerWon = 'WAGER_WON'
}

export type ScoreboardWhereInput = {
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  addressLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  addressNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  table_id?: InputMaybe<Scalars['felt252']['input']>;
  table_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idGT?: InputMaybe<Scalars['felt252']['input']>;
  table_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idLIKE?: InputMaybe<Scalars['felt252']['input']>;
  table_idLT?: InputMaybe<Scalars['felt252']['input']>;
  table_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  wager_lost?: InputMaybe<Scalars['u256']['input']>;
  wager_lostEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_lostGT?: InputMaybe<Scalars['u256']['input']>;
  wager_lostGTE?: InputMaybe<Scalars['u256']['input']>;
  wager_lostIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_lostLIKE?: InputMaybe<Scalars['u256']['input']>;
  wager_lostLT?: InputMaybe<Scalars['u256']['input']>;
  wager_lostLTE?: InputMaybe<Scalars['u256']['input']>;
  wager_lostNEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_lostNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_lostNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
  wager_won?: InputMaybe<Scalars['u256']['input']>;
  wager_wonEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_wonGT?: InputMaybe<Scalars['u256']['input']>;
  wager_wonGTE?: InputMaybe<Scalars['u256']['input']>;
  wager_wonIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_wonLIKE?: InputMaybe<Scalars['u256']['input']>;
  wager_wonLT?: InputMaybe<Scalars['u256']['input']>;
  wager_wonLTE?: InputMaybe<Scalars['u256']['input']>;
  wager_wonNEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_wonNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_wonNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
};

export type Scoreboard_Score = {
  __typename?: 'Scoreboard_Score';
  honour?: Maybe<Scalars['u8']['output']>;
  level_lord?: Maybe<Scalars['u8']['output']>;
  level_trickster?: Maybe<Scalars['u8']['output']>;
  level_villain?: Maybe<Scalars['u8']['output']>;
  total_draws?: Maybe<Scalars['u16']['output']>;
  total_duels?: Maybe<Scalars['u16']['output']>;
  total_honour?: Maybe<Scalars['u32']['output']>;
  total_losses?: Maybe<Scalars['u16']['output']>;
  total_wins?: Maybe<Scalars['u16']['output']>;
};

export type Snapshot = {
  __typename?: 'Snapshot';
  duel_id?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<World__Entity>;
  score_a?: Maybe<Snapshot_Score>;
  score_b?: Maybe<Snapshot_Score>;
};

export type SnapshotConnection = {
  __typename?: 'SnapshotConnection';
  edges?: Maybe<Array<Maybe<SnapshotEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SnapshotEdge = {
  __typename?: 'SnapshotEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Snapshot>;
};

export type SnapshotOrder = {
  direction: OrderDirection;
  field: SnapshotOrderField;
};

export enum SnapshotOrderField {
  DuelId = 'DUEL_ID',
  ScoreA = 'SCORE_A',
  ScoreB = 'SCORE_B'
}

export type SnapshotWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idLIKE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
};

export type Snapshot_Score = {
  __typename?: 'Snapshot_Score';
  honour?: Maybe<Scalars['u8']['output']>;
  level_lord?: Maybe<Scalars['u8']['output']>;
  level_trickster?: Maybe<Scalars['u8']['output']>;
  level_villain?: Maybe<Scalars['u8']['output']>;
  total_draws?: Maybe<Scalars['u16']['output']>;
  total_duels?: Maybe<Scalars['u16']['output']>;
  total_honour?: Maybe<Scalars['u32']['output']>;
  total_losses?: Maybe<Scalars['u16']['output']>;
  total_wins?: Maybe<Scalars['u16']['output']>;
};

export type TTable = {
  __typename?: 'TTable';
  contract_address?: Maybe<Scalars['ContractAddress']['output']>;
  description?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  fee_min?: Maybe<Scalars['u256']['output']>;
  fee_pct?: Maybe<Scalars['u8']['output']>;
  is_open?: Maybe<Scalars['bool']['output']>;
  table_id?: Maybe<Scalars['felt252']['output']>;
  wager_min?: Maybe<Scalars['u256']['output']>;
};

export type TTableConnection = {
  __typename?: 'TTableConnection';
  edges?: Maybe<Array<Maybe<TTableEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TTableEdge = {
  __typename?: 'TTableEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<TTable>;
};

export type TTableOrder = {
  direction: OrderDirection;
  field: TTableOrderField;
};

export enum TTableOrderField {
  ContractAddress = 'CONTRACT_ADDRESS',
  Description = 'DESCRIPTION',
  FeeMin = 'FEE_MIN',
  FeePct = 'FEE_PCT',
  IsOpen = 'IS_OPEN',
  TableId = 'TABLE_ID',
  WagerMin = 'WAGER_MIN'
}

export type TTableWhereInput = {
  contract_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  contract_addressLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  contract_addressNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  description?: InputMaybe<Scalars['felt252']['input']>;
  descriptionEQ?: InputMaybe<Scalars['felt252']['input']>;
  descriptionGT?: InputMaybe<Scalars['felt252']['input']>;
  descriptionGTE?: InputMaybe<Scalars['felt252']['input']>;
  descriptionIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  descriptionLIKE?: InputMaybe<Scalars['felt252']['input']>;
  descriptionLT?: InputMaybe<Scalars['felt252']['input']>;
  descriptionLTE?: InputMaybe<Scalars['felt252']['input']>;
  descriptionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  descriptionNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  descriptionNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  fee_min?: InputMaybe<Scalars['u256']['input']>;
  fee_minEQ?: InputMaybe<Scalars['u256']['input']>;
  fee_minGT?: InputMaybe<Scalars['u256']['input']>;
  fee_minGTE?: InputMaybe<Scalars['u256']['input']>;
  fee_minIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  fee_minLIKE?: InputMaybe<Scalars['u256']['input']>;
  fee_minLT?: InputMaybe<Scalars['u256']['input']>;
  fee_minLTE?: InputMaybe<Scalars['u256']['input']>;
  fee_minNEQ?: InputMaybe<Scalars['u256']['input']>;
  fee_minNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  fee_minNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
  fee_pct?: InputMaybe<Scalars['u8']['input']>;
  fee_pctEQ?: InputMaybe<Scalars['u8']['input']>;
  fee_pctGT?: InputMaybe<Scalars['u8']['input']>;
  fee_pctGTE?: InputMaybe<Scalars['u8']['input']>;
  fee_pctIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  fee_pctLIKE?: InputMaybe<Scalars['u8']['input']>;
  fee_pctLT?: InputMaybe<Scalars['u8']['input']>;
  fee_pctLTE?: InputMaybe<Scalars['u8']['input']>;
  fee_pctNEQ?: InputMaybe<Scalars['u8']['input']>;
  fee_pctNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  fee_pctNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  is_open?: InputMaybe<Scalars['bool']['input']>;
  table_id?: InputMaybe<Scalars['felt252']['input']>;
  table_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idGT?: InputMaybe<Scalars['felt252']['input']>;
  table_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idLIKE?: InputMaybe<Scalars['felt252']['input']>;
  table_idLT?: InputMaybe<Scalars['felt252']['input']>;
  table_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  table_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  table_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  table_idNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  wager_min?: InputMaybe<Scalars['u256']['input']>;
  wager_minEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_minGT?: InputMaybe<Scalars['u256']['input']>;
  wager_minGTE?: InputMaybe<Scalars['u256']['input']>;
  wager_minIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_minLIKE?: InputMaybe<Scalars['u256']['input']>;
  wager_minLT?: InputMaybe<Scalars['u256']['input']>;
  wager_minLTE?: InputMaybe<Scalars['u256']['input']>;
  wager_minNEQ?: InputMaybe<Scalars['u256']['input']>;
  wager_minNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  wager_minNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
};

export type Wager = {
  __typename?: 'Wager';
  duel_id?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<World__Entity>;
  fee?: Maybe<Scalars['u256']['output']>;
  value?: Maybe<Scalars['u256']['output']>;
};

export type WagerConnection = {
  __typename?: 'WagerConnection';
  edges?: Maybe<Array<Maybe<WagerEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WagerEdge = {
  __typename?: 'WagerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Wager>;
};

export type WagerOrder = {
  direction: OrderDirection;
  field: WagerOrderField;
};

export enum WagerOrderField {
  DuelId = 'DUEL_ID',
  Fee = 'FEE',
  Value = 'VALUE'
}

export type WagerWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idLIKE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u128']['input']>>>;
  duel_idNOTLIKE?: InputMaybe<Scalars['u128']['input']>;
  fee?: InputMaybe<Scalars['u256']['input']>;
  feeEQ?: InputMaybe<Scalars['u256']['input']>;
  feeGT?: InputMaybe<Scalars['u256']['input']>;
  feeGTE?: InputMaybe<Scalars['u256']['input']>;
  feeIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  feeLIKE?: InputMaybe<Scalars['u256']['input']>;
  feeLT?: InputMaybe<Scalars['u256']['input']>;
  feeLTE?: InputMaybe<Scalars['u256']['input']>;
  feeNEQ?: InputMaybe<Scalars['u256']['input']>;
  feeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  feeNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
  value?: InputMaybe<Scalars['u256']['input']>;
  valueEQ?: InputMaybe<Scalars['u256']['input']>;
  valueGT?: InputMaybe<Scalars['u256']['input']>;
  valueGTE?: InputMaybe<Scalars['u256']['input']>;
  valueIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  valueLIKE?: InputMaybe<Scalars['u256']['input']>;
  valueLT?: InputMaybe<Scalars['u256']['input']>;
  valueLTE?: InputMaybe<Scalars['u256']['input']>;
  valueNEQ?: InputMaybe<Scalars['u256']['input']>;
  valueNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u256']['input']>>>;
  valueNOTLIKE?: InputMaybe<Scalars['u256']['input']>;
};

export type World__Content = {
  __typename?: 'World__Content';
  coverUri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__EventMessage = {
  __typename?: 'World__EventMessage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EventMessageConnection = {
  __typename?: 'World__EventMessageConnection';
  edges?: Maybe<Array<Maybe<World__EventMessageEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventMessageEdge = {
  __typename?: 'World__EventMessageEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__EventMessage>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  iconImg?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  worldAddress: Scalars['String']['output'];
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  classHash?: Maybe<Scalars['felt252']['output']>;
  contractAddress?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__ModelOrder = {
  direction: OrderDirection;
  field: World__ModelOrderField;
};

export enum World__ModelOrderField {
  ClassHash = 'CLASS_HASH',
  Name = 'NAME'
}

export type World__PageInfo = {
  __typename?: 'World__PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type World__Query = {
  __typename?: 'World__Query';
  challengeModels?: Maybe<ChallengeConnection>;
  chancesModels?: Maybe<ChancesConnection>;
  configModels?: Maybe<ConfigConnection>;
  duelistModels?: Maybe<DuelistConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  erc20AllowanceModelModels?: Maybe<Erc20AllowanceModelConnection>;
  erc20BalanceModelModels?: Maybe<Erc20BalanceModelConnection>;
  erc20MetadataModelModels?: Maybe<Erc20MetadataModelConnection>;
  eventMessage: World__EventMessage;
  eventMessages?: Maybe<World__EventMessageConnection>;
  events?: Maybe<World__EventConnection>;
  initializableModelModels?: Maybe<InitializableModelConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  pactModels?: Maybe<PactConnection>;
  roundModels?: Maybe<RoundConnection>;
  scoreboardModels?: Maybe<ScoreboardConnection>;
  snapshotModels?: Maybe<SnapshotConnection>;
  tTableModels?: Maybe<TTableConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
  wagerModels?: Maybe<WagerConnection>;
};


export type World__QueryChallengeModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ChallengeOrder>;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type World__QueryChancesModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ChancesOrder>;
  where?: InputMaybe<ChancesWhereInput>;
};


export type World__QueryConfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ConfigOrder>;
  where?: InputMaybe<ConfigWhereInput>;
};


export type World__QueryDuelistModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DuelistOrder>;
  where?: InputMaybe<DuelistWhereInput>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryErc20AllowanceModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20AllowanceModelOrder>;
  where?: InputMaybe<Erc20AllowanceModelWhereInput>;
};


export type World__QueryErc20BalanceModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20BalanceModelOrder>;
  where?: InputMaybe<Erc20BalanceModelWhereInput>;
};


export type World__QueryErc20MetadataModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20MetadataModelOrder>;
  where?: InputMaybe<Erc20MetadataModelWhereInput>;
};


export type World__QueryEventMessageArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryInitializableModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InitializableModelOrder>;
  where?: InputMaybe<InitializableModelWhereInput>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<World__ModelOrder>;
};


export type World__QueryPactModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PactOrder>;
  where?: InputMaybe<PactWhereInput>;
};


export type World__QueryRoundModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RoundOrder>;
  where?: InputMaybe<RoundWhereInput>;
};


export type World__QueryScoreboardModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ScoreboardOrder>;
  where?: InputMaybe<ScoreboardWhereInput>;
};


export type World__QuerySnapshotModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SnapshotOrder>;
  where?: InputMaybe<SnapshotWhereInput>;
};


export type World__QueryTTableModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TTableOrder>;
  where?: InputMaybe<TTableWhereInput>;
};


export type World__QueryTransactionArgs = {
  transactionHash: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryWagerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WagerOrder>;
  where?: InputMaybe<WagerWhereInput>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  eventMessageUpdated: World__EventMessage;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionEventMessageUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxFee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  senderAddress?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};

export type CustomEventSubSubscriptionVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type CustomEventSubSubscription = { __typename?: 'World__Subscription', eventEmitted: { __typename?: 'World__Event', id?: string | null, keys?: Array<string | null> | null, data?: Array<string | null> | null, createdAt?: any | null } };

export type ChallengeFieldsFragment = { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null };

export type GetChallengesByIdQueryVariables = Exact<{
  duel_id: Scalars['u128']['input'];
}>;


export type GetChallengesByIdQuery = { __typename?: 'World__Query', challenges?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByStateQueryVariables = Exact<{
  state: Scalars['u8']['input'];
}>;


export type GetChallengesByStateQuery = { __typename?: 'World__Query', challenges?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByStatesQueryVariables = Exact<{
  state1: Scalars['u8']['input'];
  state2: Scalars['u8']['input'];
}>;


export type GetChallengesByStatesQuery = { __typename?: 'World__Query', challenges_1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByDuelistAndStateQueryVariables = Exact<{
  address: Scalars['ContractAddress']['input'];
  state: Scalars['u8']['input'];
}>;


export type GetChallengesByDuelistAndStateQuery = { __typename?: 'World__Query', challenges_a?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByDuelistAndStatesQueryVariables = Exact<{
  address: Scalars['ContractAddress']['input'];
  state1: Scalars['u8']['input'];
  state2: Scalars['u8']['input'];
}>;


export type GetChallengesByDuelistAndStatesQuery = { __typename?: 'World__Query', challenges_a1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_a2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, table_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengeDependenciesQueryVariables = Exact<{
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  table_id?: InputMaybe<Scalars['felt252']['input']>;
  duelist_a?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_b?: InputMaybe<Scalars['ContractAddress']['input']>;
}>;


export type GetChallengeDependenciesQuery = { __typename?: 'World__Query', table?: { __typename?: 'TTableConnection', edges?: Array<{ __typename?: 'TTableEdge', node?: { __typename?: 'TTable', description?: any | null, contract_address?: any | null, wager_min?: any | null, fee_min?: any | null, fee_pct?: any | null, is_open?: any | null } | null } | null> | null } | null, wager?: { __typename?: 'WagerConnection', edges?: Array<{ __typename?: 'WagerEdge', node?: { __typename?: 'Wager', value?: any | null, fee?: any | null } | null } | null> | null } | null, duelist_a?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, timestamp?: any | null, score?: { __typename?: 'Duelist_Score', honour?: any | null, level_villain?: any | null, level_trickster?: any | null, level_lord?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null } | null } | null } | null> | null } | null, duelist_b?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, timestamp?: any | null, score?: { __typename?: 'Duelist_Score', honour?: any | null, level_villain?: any | null, level_trickster?: any | null, level_lord?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null } | null } | null } | null> | null } | null };

export type DuelistFieldsFragment = { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, timestamp?: any | null, score?: { __typename?: 'Duelist_Score', honour?: any | null, level_villain?: any | null, level_trickster?: any | null, level_lord?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null } | null };

export type GetDuelistsByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
}>;


export type GetDuelistsByAddressQuery = { __typename?: 'World__Query', duelistModels?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, timestamp?: any | null, score?: { __typename?: 'Duelist_Score', honour?: any | null, level_villain?: any | null, level_trickster?: any | null, level_lord?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null } | null } | null } | null> | null } | null };

export const ChallengeFieldsFragmentDoc = gql`
    fragment challengeFields on Challenge {
  duel_id
  table_id
  duelist_a
  duelist_b
  message
  round_number
  state
  timestamp_end
  timestamp_start
  winner
}
    `;
export const DuelistFieldsFragmentDoc = gql`
    fragment duelistFields on Duelist {
  address
  name
  profile_pic
  timestamp
  score {
    honour
    level_villain
    level_trickster
    level_lord
    total_duels
    total_wins
    total_losses
    total_draws
    total_honour
  }
}
    `;
export const CustomEventSubDocument = gql`
    subscription customEventSub($eventId: String!) {
  eventEmitted(keys: [$eventId, "*"]) {
    id
    keys
    data
    createdAt
  }
}
    `;
export const GetChallengesByIdDocument = gql`
    query getChallengesById($duel_id: u128!) {
  challenges: challengeModels(where: {duel_id: $duel_id}) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
}
    ${ChallengeFieldsFragmentDoc}`;
export const GetChallengesByStateDocument = gql`
    query getChallengesByState($state: u8!) {
  challenges: challengeModels(where: {state: $state}, limit: 10) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
}
    ${ChallengeFieldsFragmentDoc}`;
export const GetChallengesByStatesDocument = gql`
    query getChallengesByStates($state1: u8!, $state2: u8!) {
  challenges_1: challengeModels(where: {state: $state1}, limit: 10) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
  challenges_2: challengeModels(where: {state: $state2}, limit: 10) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
}
    ${ChallengeFieldsFragmentDoc}`;
export const GetChallengesByDuelistAndStateDocument = gql`
    query getChallengesByDuelistAndState($address: ContractAddress!, $state: u8!) {
  challenges_a: challengeModels(
    where: {duelist_a: $address, state: $state}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
  challenges_b: challengeModels(
    where: {duelist_b: $address, state: $state}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
}
    ${ChallengeFieldsFragmentDoc}`;
export const GetChallengesByDuelistAndStatesDocument = gql`
    query getChallengesByDuelistAndStates($address: ContractAddress!, $state1: u8!, $state2: u8!) {
  challenges_a1: challengeModels(
    where: {duelist_a: $address, state: $state1}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
  challenges_a2: challengeModels(
    where: {duelist_a: $address, state: $state2}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
  challenges_b1: challengeModels(
    where: {duelist_b: $address, state: $state1}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
  challenges_b2: challengeModels(
    where: {duelist_b: $address, state: $state2}
    limit: 10
  ) {
    edges {
      node {
        ...challengeFields
      }
    }
  }
}
    ${ChallengeFieldsFragmentDoc}`;
export const GetChallengeDependenciesDocument = gql`
    query getChallengeDependencies($duel_id: u128, $table_id: felt252, $duelist_a: ContractAddress, $duelist_b: ContractAddress) {
  table: tTableModels(where: {table_id: $table_id}) {
    edges {
      node {
        description
        contract_address
        wager_min
        fee_min
        fee_pct
        is_open
      }
    }
  }
  wager: wagerModels(where: {duel_id: $duel_id}) {
    edges {
      node {
        value
        fee
      }
    }
  }
  duelist_a: duelistModels(where: {address: $duelist_a}) {
    edges {
      node {
        ...duelistFields
      }
    }
  }
  duelist_b: duelistModels(where: {address: $duelist_b}) {
    edges {
      node {
        ...duelistFields
      }
    }
  }
}
    ${DuelistFieldsFragmentDoc}`;
export const GetDuelistsByAddressDocument = gql`
    query getDuelistsByAddress($address: ContractAddress) {
  duelistModels(where: {address: $address}) {
    edges {
      node {
        ...duelistFields
      }
    }
  }
}
    ${DuelistFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const CustomEventSubDocumentString = print(CustomEventSubDocument);
const GetChallengesByIdDocumentString = print(GetChallengesByIdDocument);
const GetChallengesByStateDocumentString = print(GetChallengesByStateDocument);
const GetChallengesByStatesDocumentString = print(GetChallengesByStatesDocument);
const GetChallengesByDuelistAndStateDocumentString = print(GetChallengesByDuelistAndStateDocument);
const GetChallengesByDuelistAndStatesDocumentString = print(GetChallengesByDuelistAndStatesDocument);
const GetChallengeDependenciesDocumentString = print(GetChallengeDependenciesDocument);
const GetDuelistsByAddressDocumentString = print(GetDuelistsByAddressDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    customEventSub(variables: CustomEventSubSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CustomEventSubSubscription; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CustomEventSubSubscription>(CustomEventSubDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'customEventSub', 'subscription', variables);
    },
    getChallengesById(variables: GetChallengesByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengesByIdQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengesByIdQuery>(GetChallengesByIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengesById', 'query', variables);
    },
    getChallengesByState(variables: GetChallengesByStateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengesByStateQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengesByStateQuery>(GetChallengesByStateDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengesByState', 'query', variables);
    },
    getChallengesByStates(variables: GetChallengesByStatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengesByStatesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengesByStatesQuery>(GetChallengesByStatesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengesByStates', 'query', variables);
    },
    getChallengesByDuelistAndState(variables: GetChallengesByDuelistAndStateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengesByDuelistAndStateQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengesByDuelistAndStateQuery>(GetChallengesByDuelistAndStateDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengesByDuelistAndState', 'query', variables);
    },
    getChallengesByDuelistAndStates(variables: GetChallengesByDuelistAndStatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengesByDuelistAndStatesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengesByDuelistAndStatesQuery>(GetChallengesByDuelistAndStatesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengesByDuelistAndStates', 'query', variables);
    },
    getChallengeDependencies(variables?: GetChallengeDependenciesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetChallengeDependenciesQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetChallengeDependenciesQuery>(GetChallengeDependenciesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChallengeDependencies', 'query', variables);
    },
    getDuelistsByAddress(variables?: GetDuelistsByAddressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetDuelistsByAddressQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetDuelistsByAddressQuery>(GetDuelistsByAddressDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDuelistsByAddress', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;