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
  TimestampEnd = 'TIMESTAMP_END',
  TimestampStart = 'TIMESTAMP_START',
  Winner = 'WINNER'
}

export type ChallengeWhereInput = {
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  duelist_a?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_aNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_b?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_bNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  message?: InputMaybe<Scalars['felt252']['input']>;
  messageEQ?: InputMaybe<Scalars['felt252']['input']>;
  messageGT?: InputMaybe<Scalars['felt252']['input']>;
  messageGTE?: InputMaybe<Scalars['felt252']['input']>;
  messageLT?: InputMaybe<Scalars['felt252']['input']>;
  messageLTE?: InputMaybe<Scalars['felt252']['input']>;
  messageNEQ?: InputMaybe<Scalars['felt252']['input']>;
  round_number?: InputMaybe<Scalars['u8']['input']>;
  round_numberEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberGT?: InputMaybe<Scalars['u8']['input']>;
  round_numberGTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberLT?: InputMaybe<Scalars['u8']['input']>;
  round_numberLTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberNEQ?: InputMaybe<Scalars['u8']['input']>;
  state?: InputMaybe<Scalars['u8']['input']>;
  stateEQ?: InputMaybe<Scalars['u8']['input']>;
  stateGT?: InputMaybe<Scalars['u8']['input']>;
  stateGTE?: InputMaybe<Scalars['u8']['input']>;
  stateLT?: InputMaybe<Scalars['u8']['input']>;
  stateLTE?: InputMaybe<Scalars['u8']['input']>;
  stateNEQ?: InputMaybe<Scalars['u8']['input']>;
  timestamp_end?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endGT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endGTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endLT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endLTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_endNEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_start?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startEQ?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startGT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startGTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startLT?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startLTE?: InputMaybe<Scalars['u64']['input']>;
  timestamp_startNEQ?: InputMaybe<Scalars['u64']['input']>;
  winner?: InputMaybe<Scalars['u8']['input']>;
  winnerEQ?: InputMaybe<Scalars['u8']['input']>;
  winnerGT?: InputMaybe<Scalars['u8']['input']>;
  winnerGTE?: InputMaybe<Scalars['u8']['input']>;
  winnerLT?: InputMaybe<Scalars['u8']['input']>;
  winnerLTE?: InputMaybe<Scalars['u8']['input']>;
  winnerNEQ?: InputMaybe<Scalars['u8']['input']>;
};

export type Coin = {
  __typename?: 'Coin';
  contract_address?: Maybe<Scalars['ContractAddress']['output']>;
  description?: Maybe<Scalars['felt252']['output']>;
  enabled?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  fee_min?: Maybe<Scalars['u256']['output']>;
  fee_pct?: Maybe<Scalars['u8']['output']>;
  key?: Maybe<Scalars['u8']['output']>;
};

export type CoinConnection = {
  __typename?: 'CoinConnection';
  edges?: Maybe<Array<Maybe<CoinEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CoinEdge = {
  __typename?: 'CoinEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Coin>;
};

export type CoinOrder = {
  direction: OrderDirection;
  field: CoinOrderField;
};

export enum CoinOrderField {
  ContractAddress = 'CONTRACT_ADDRESS',
  Description = 'DESCRIPTION',
  Enabled = 'ENABLED',
  FeeMin = 'FEE_MIN',
  FeePct = 'FEE_PCT',
  Key = 'KEY'
}

export type CoinWhereInput = {
  contract_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  contract_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  description?: InputMaybe<Scalars['felt252']['input']>;
  descriptionEQ?: InputMaybe<Scalars['felt252']['input']>;
  descriptionGT?: InputMaybe<Scalars['felt252']['input']>;
  descriptionGTE?: InputMaybe<Scalars['felt252']['input']>;
  descriptionLT?: InputMaybe<Scalars['felt252']['input']>;
  descriptionLTE?: InputMaybe<Scalars['felt252']['input']>;
  descriptionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  enabled?: InputMaybe<Scalars['bool']['input']>;
  fee_min?: InputMaybe<Scalars['u256']['input']>;
  fee_minEQ?: InputMaybe<Scalars['u256']['input']>;
  fee_minGT?: InputMaybe<Scalars['u256']['input']>;
  fee_minGTE?: InputMaybe<Scalars['u256']['input']>;
  fee_minLT?: InputMaybe<Scalars['u256']['input']>;
  fee_minLTE?: InputMaybe<Scalars['u256']['input']>;
  fee_minNEQ?: InputMaybe<Scalars['u256']['input']>;
  fee_pct?: InputMaybe<Scalars['u8']['input']>;
  fee_pctEQ?: InputMaybe<Scalars['u8']['input']>;
  fee_pctGT?: InputMaybe<Scalars['u8']['input']>;
  fee_pctGTE?: InputMaybe<Scalars['u8']['input']>;
  fee_pctLT?: InputMaybe<Scalars['u8']['input']>;
  fee_pctLTE?: InputMaybe<Scalars['u8']['input']>;
  fee_pctNEQ?: InputMaybe<Scalars['u8']['input']>;
  key?: InputMaybe<Scalars['u8']['input']>;
  keyEQ?: InputMaybe<Scalars['u8']['input']>;
  keyGT?: InputMaybe<Scalars['u8']['input']>;
  keyGTE?: InputMaybe<Scalars['u8']['input']>;
  keyLT?: InputMaybe<Scalars['u8']['input']>;
  keyLTE?: InputMaybe<Scalars['u8']['input']>;
  keyNEQ?: InputMaybe<Scalars['u8']['input']>;
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
  keyLT?: InputMaybe<Scalars['u8']['input']>;
  keyLTE?: InputMaybe<Scalars['u8']['input']>;
  keyNEQ?: InputMaybe<Scalars['u8']['input']>;
  owner_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  paused?: InputMaybe<Scalars['bool']['input']>;
  treasury_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  treasury_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Duelist = {
  __typename?: 'Duelist';
  address?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  honour?: Maybe<Scalars['u8']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  profile_pic?: Maybe<Scalars['u8']['output']>;
  timestamp?: Maybe<Scalars['u64']['output']>;
  total_draws?: Maybe<Scalars['u16']['output']>;
  total_duels?: Maybe<Scalars['u16']['output']>;
  total_honour?: Maybe<Scalars['u32']['output']>;
  total_losses?: Maybe<Scalars['u16']['output']>;
  total_wins?: Maybe<Scalars['u16']['output']>;
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
  Honour = 'HONOUR',
  Name = 'NAME',
  ProfilePic = 'PROFILE_PIC',
  Timestamp = 'TIMESTAMP',
  TotalDraws = 'TOTAL_DRAWS',
  TotalDuels = 'TOTAL_DUELS',
  TotalHonour = 'TOTAL_HONOUR',
  TotalLosses = 'TOTAL_LOSSES',
  TotalWins = 'TOTAL_WINS'
}

export type DuelistWhereInput = {
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  honour?: InputMaybe<Scalars['u8']['input']>;
  honourEQ?: InputMaybe<Scalars['u8']['input']>;
  honourGT?: InputMaybe<Scalars['u8']['input']>;
  honourGTE?: InputMaybe<Scalars['u8']['input']>;
  honourLT?: InputMaybe<Scalars['u8']['input']>;
  honourLTE?: InputMaybe<Scalars['u8']['input']>;
  honourNEQ?: InputMaybe<Scalars['u8']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  profile_pic?: InputMaybe<Scalars['u8']['input']>;
  profile_picEQ?: InputMaybe<Scalars['u8']['input']>;
  profile_picGT?: InputMaybe<Scalars['u8']['input']>;
  profile_picGTE?: InputMaybe<Scalars['u8']['input']>;
  profile_picLT?: InputMaybe<Scalars['u8']['input']>;
  profile_picLTE?: InputMaybe<Scalars['u8']['input']>;
  profile_picNEQ?: InputMaybe<Scalars['u8']['input']>;
  timestamp?: InputMaybe<Scalars['u64']['input']>;
  timestampEQ?: InputMaybe<Scalars['u64']['input']>;
  timestampGT?: InputMaybe<Scalars['u64']['input']>;
  timestampGTE?: InputMaybe<Scalars['u64']['input']>;
  timestampLT?: InputMaybe<Scalars['u64']['input']>;
  timestampLTE?: InputMaybe<Scalars['u64']['input']>;
  timestampNEQ?: InputMaybe<Scalars['u64']['input']>;
  total_draws?: InputMaybe<Scalars['u16']['input']>;
  total_drawsEQ?: InputMaybe<Scalars['u16']['input']>;
  total_drawsGT?: InputMaybe<Scalars['u16']['input']>;
  total_drawsGTE?: InputMaybe<Scalars['u16']['input']>;
  total_drawsLT?: InputMaybe<Scalars['u16']['input']>;
  total_drawsLTE?: InputMaybe<Scalars['u16']['input']>;
  total_drawsNEQ?: InputMaybe<Scalars['u16']['input']>;
  total_duels?: InputMaybe<Scalars['u16']['input']>;
  total_duelsEQ?: InputMaybe<Scalars['u16']['input']>;
  total_duelsGT?: InputMaybe<Scalars['u16']['input']>;
  total_duelsGTE?: InputMaybe<Scalars['u16']['input']>;
  total_duelsLT?: InputMaybe<Scalars['u16']['input']>;
  total_duelsLTE?: InputMaybe<Scalars['u16']['input']>;
  total_duelsNEQ?: InputMaybe<Scalars['u16']['input']>;
  total_honour?: InputMaybe<Scalars['u32']['input']>;
  total_honourEQ?: InputMaybe<Scalars['u32']['input']>;
  total_honourGT?: InputMaybe<Scalars['u32']['input']>;
  total_honourGTE?: InputMaybe<Scalars['u32']['input']>;
  total_honourLT?: InputMaybe<Scalars['u32']['input']>;
  total_honourLTE?: InputMaybe<Scalars['u32']['input']>;
  total_honourNEQ?: InputMaybe<Scalars['u32']['input']>;
  total_losses?: InputMaybe<Scalars['u16']['input']>;
  total_lossesEQ?: InputMaybe<Scalars['u16']['input']>;
  total_lossesGT?: InputMaybe<Scalars['u16']['input']>;
  total_lossesGTE?: InputMaybe<Scalars['u16']['input']>;
  total_lossesLT?: InputMaybe<Scalars['u16']['input']>;
  total_lossesLTE?: InputMaybe<Scalars['u16']['input']>;
  total_lossesNEQ?: InputMaybe<Scalars['u16']['input']>;
  total_wins?: InputMaybe<Scalars['u16']['input']>;
  total_winsEQ?: InputMaybe<Scalars['u16']['input']>;
  total_winsGT?: InputMaybe<Scalars['u16']['input']>;
  total_winsGTE?: InputMaybe<Scalars['u16']['input']>;
  total_winsLT?: InputMaybe<Scalars['u16']['input']>;
  total_winsLTE?: InputMaybe<Scalars['u16']['input']>;
  total_winsNEQ?: InputMaybe<Scalars['u16']['input']>;
};

export type Erc20Allowance = {
  __typename?: 'ERC20Allowance';
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  spender?: Maybe<Scalars['ContractAddress']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc20AllowanceConnection = {
  __typename?: 'ERC20AllowanceConnection';
  edges?: Maybe<Array<Maybe<Erc20AllowanceEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20AllowanceEdge = {
  __typename?: 'ERC20AllowanceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20Allowance>;
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
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spender?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20AllowanceOrder = {
  direction: OrderDirection;
  field: Erc20AllowanceOrderField;
};

export enum Erc20AllowanceOrderField {
  Amount = 'AMOUNT',
  Owner = 'OWNER',
  Spender = 'SPENDER',
  Token = 'TOKEN'
}

export type Erc20AllowanceWhereInput = {
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spender?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  spenderNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20Balance = {
  __typename?: 'ERC20Balance';
  account?: Maybe<Scalars['ContractAddress']['output']>;
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc20BalanceConnection = {
  __typename?: 'ERC20BalanceConnection';
  edges?: Maybe<Array<Maybe<Erc20BalanceEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20BalanceEdge = {
  __typename?: 'ERC20BalanceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20Balance>;
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
  accountLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20BalanceOrder = {
  direction: OrderDirection;
  field: Erc20BalanceOrderField;
};

export enum Erc20BalanceOrderField {
  Account = 'ACCOUNT',
  Amount = 'AMOUNT',
  Token = 'TOKEN'
}

export type Erc20BalanceWhereInput = {
  account?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20BridgeableModel = {
  __typename?: 'ERC20BridgeableModel';
  entity?: Maybe<World__Entity>;
  l2_bridge_address?: Maybe<Scalars['ContractAddress']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc20BridgeableModelConnection = {
  __typename?: 'ERC20BridgeableModelConnection';
  edges?: Maybe<Array<Maybe<Erc20BridgeableModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20BridgeableModelEdge = {
  __typename?: 'ERC20BridgeableModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20BridgeableModel>;
};

export type Erc20BridgeableModelOrder = {
  direction: OrderDirection;
  field: Erc20BridgeableModelOrderField;
};

export enum Erc20BridgeableModelOrderField {
  L2BridgeAddress = 'L2_BRIDGE_ADDRESS',
  Token = 'TOKEN'
}

export type Erc20BridgeableModelWhereInput = {
  l2_bridge_address?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  l2_bridge_addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc20Meta = {
  __typename?: 'ERC20Meta';
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  symbol?: Maybe<Scalars['felt252']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
  total_supply?: Maybe<Scalars['u256']['output']>;
};

export type Erc20MetaConnection = {
  __typename?: 'ERC20MetaConnection';
  edges?: Maybe<Array<Maybe<Erc20MetaEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20MetaEdge = {
  __typename?: 'ERC20MetaEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc20Meta>;
};

export type Erc20MetaOrder = {
  direction: OrderDirection;
  field: Erc20MetaOrderField;
};

export enum Erc20MetaOrderField {
  Name = 'NAME',
  Symbol = 'SYMBOL',
  Token = 'TOKEN',
  TotalSupply = 'TOTAL_SUPPLY'
}

export type Erc20MetaWhereInput = {
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbol?: InputMaybe<Scalars['felt252']['input']>;
  symbolEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolGT?: InputMaybe<Scalars['felt252']['input']>;
  symbolGTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolLT?: InputMaybe<Scalars['felt252']['input']>;
  symbolLTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolNEQ?: InputMaybe<Scalars['felt252']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  total_supply?: InputMaybe<Scalars['u256']['input']>;
  total_supplyEQ?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyNEQ?: InputMaybe<Scalars['u256']['input']>;
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
  decimalsLT?: InputMaybe<Scalars['u8']['input']>;
  decimalsLTE?: InputMaybe<Scalars['u8']['input']>;
  decimalsNEQ?: InputMaybe<Scalars['u8']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbol?: InputMaybe<Scalars['felt252']['input']>;
  symbolEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolGT?: InputMaybe<Scalars['felt252']['input']>;
  symbolGTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolLT?: InputMaybe<Scalars['felt252']['input']>;
  symbolLTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolNEQ?: InputMaybe<Scalars['felt252']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  total_supply?: InputMaybe<Scalars['u256']['input']>;
  total_supplyEQ?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyGTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLT?: InputMaybe<Scalars['u256']['input']>;
  total_supplyLTE?: InputMaybe<Scalars['u256']['input']>;
  total_supplyNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type Erc721Balance = {
  __typename?: 'ERC721Balance';
  account?: Maybe<Scalars['ContractAddress']['output']>;
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc721BalanceConnection = {
  __typename?: 'ERC721BalanceConnection';
  edges?: Maybe<Array<Maybe<Erc721BalanceEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc721BalanceEdge = {
  __typename?: 'ERC721BalanceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc721Balance>;
};

export type Erc721BalanceOrder = {
  direction: OrderDirection;
  field: Erc721BalanceOrderField;
};

export enum Erc721BalanceOrderField {
  Account = 'ACCOUNT',
  Amount = 'AMOUNT',
  Token = 'TOKEN'
}

export type Erc721BalanceWhereInput = {
  account?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc721Meta = {
  __typename?: 'ERC721Meta';
  base_uri?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  symbol?: Maybe<Scalars['felt252']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc721MetaConnection = {
  __typename?: 'ERC721MetaConnection';
  edges?: Maybe<Array<Maybe<Erc721MetaEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc721MetaEdge = {
  __typename?: 'ERC721MetaEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc721Meta>;
};

export type Erc721MetaOrder = {
  direction: OrderDirection;
  field: Erc721MetaOrderField;
};

export enum Erc721MetaOrderField {
  BaseUri = 'BASE_URI',
  Name = 'NAME',
  Symbol = 'SYMBOL',
  Token = 'TOKEN'
}

export type Erc721MetaWhereInput = {
  base_uri?: InputMaybe<Scalars['felt252']['input']>;
  base_uriEQ?: InputMaybe<Scalars['felt252']['input']>;
  base_uriGT?: InputMaybe<Scalars['felt252']['input']>;
  base_uriGTE?: InputMaybe<Scalars['felt252']['input']>;
  base_uriLT?: InputMaybe<Scalars['felt252']['input']>;
  base_uriLTE?: InputMaybe<Scalars['felt252']['input']>;
  base_uriNEQ?: InputMaybe<Scalars['felt252']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbol?: InputMaybe<Scalars['felt252']['input']>;
  symbolEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolGT?: InputMaybe<Scalars['felt252']['input']>;
  symbolGTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolLT?: InputMaybe<Scalars['felt252']['input']>;
  symbolLTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolNEQ?: InputMaybe<Scalars['felt252']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc721OperatorApproval = {
  __typename?: 'ERC721OperatorApproval';
  approved?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  operator?: Maybe<Scalars['ContractAddress']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc721OperatorApprovalConnection = {
  __typename?: 'ERC721OperatorApprovalConnection';
  edges?: Maybe<Array<Maybe<Erc721OperatorApprovalEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc721OperatorApprovalEdge = {
  __typename?: 'ERC721OperatorApprovalEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc721OperatorApproval>;
};

export type Erc721OperatorApprovalOrder = {
  direction: OrderDirection;
  field: Erc721OperatorApprovalOrderField;
};

export enum Erc721OperatorApprovalOrderField {
  Approved = 'APPROVED',
  Operator = 'OPERATOR',
  Owner = 'OWNER',
  Token = 'TOKEN'
}

export type Erc721OperatorApprovalWhereInput = {
  approved?: InputMaybe<Scalars['bool']['input']>;
  operator?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc721Owner = {
  __typename?: 'ERC721Owner';
  address?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
  token_id?: Maybe<Scalars['u256']['output']>;
};

export type Erc721OwnerConnection = {
  __typename?: 'ERC721OwnerConnection';
  edges?: Maybe<Array<Maybe<Erc721OwnerEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc721OwnerEdge = {
  __typename?: 'ERC721OwnerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc721Owner>;
};

export type Erc721OwnerOrder = {
  direction: OrderDirection;
  field: Erc721OwnerOrderField;
};

export enum Erc721OwnerOrderField {
  Address = 'ADDRESS',
  Token = 'TOKEN',
  TokenId = 'TOKEN_ID'
}

export type Erc721OwnerWhereInput = {
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token_id?: InputMaybe<Scalars['u256']['input']>;
  token_idEQ?: InputMaybe<Scalars['u256']['input']>;
  token_idGT?: InputMaybe<Scalars['u256']['input']>;
  token_idGTE?: InputMaybe<Scalars['u256']['input']>;
  token_idLT?: InputMaybe<Scalars['u256']['input']>;
  token_idLTE?: InputMaybe<Scalars['u256']['input']>;
  token_idNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type Erc721TokenApproval = {
  __typename?: 'ERC721TokenApproval';
  address?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
  token_id?: Maybe<Scalars['u256']['output']>;
};

export type Erc721TokenApprovalConnection = {
  __typename?: 'ERC721TokenApprovalConnection';
  edges?: Maybe<Array<Maybe<Erc721TokenApprovalEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc721TokenApprovalEdge = {
  __typename?: 'ERC721TokenApprovalEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc721TokenApproval>;
};

export type Erc721TokenApprovalOrder = {
  direction: OrderDirection;
  field: Erc721TokenApprovalOrderField;
};

export enum Erc721TokenApprovalOrderField {
  Address = 'ADDRESS',
  Token = 'TOKEN',
  TokenId = 'TOKEN_ID'
}

export type Erc721TokenApprovalWhereInput = {
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  addressNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token_id?: InputMaybe<Scalars['u256']['input']>;
  token_idEQ?: InputMaybe<Scalars['u256']['input']>;
  token_idGT?: InputMaybe<Scalars['u256']['input']>;
  token_idGTE?: InputMaybe<Scalars['u256']['input']>;
  token_idLT?: InputMaybe<Scalars['u256']['input']>;
  token_idLTE?: InputMaybe<Scalars['u256']['input']>;
  token_idNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type Erc1155Balance = {
  __typename?: 'ERC1155Balance';
  account?: Maybe<Scalars['ContractAddress']['output']>;
  amount?: Maybe<Scalars['u256']['output']>;
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u256']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc1155BalanceConnection = {
  __typename?: 'ERC1155BalanceConnection';
  edges?: Maybe<Array<Maybe<Erc1155BalanceEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc1155BalanceEdge = {
  __typename?: 'ERC1155BalanceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc1155Balance>;
};

export type Erc1155BalanceOrder = {
  direction: OrderDirection;
  field: Erc1155BalanceOrderField;
};

export enum Erc1155BalanceOrderField {
  Account = 'ACCOUNT',
  Amount = 'AMOUNT',
  Id = 'ID',
  Token = 'TOKEN'
}

export type Erc1155BalanceWhereInput = {
  account?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  accountNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  amount?: InputMaybe<Scalars['u256']['input']>;
  amountEQ?: InputMaybe<Scalars['u256']['input']>;
  amountGT?: InputMaybe<Scalars['u256']['input']>;
  amountGTE?: InputMaybe<Scalars['u256']['input']>;
  amountLT?: InputMaybe<Scalars['u256']['input']>;
  amountLTE?: InputMaybe<Scalars['u256']['input']>;
  amountNEQ?: InputMaybe<Scalars['u256']['input']>;
  id?: InputMaybe<Scalars['u256']['input']>;
  idEQ?: InputMaybe<Scalars['u256']['input']>;
  idGT?: InputMaybe<Scalars['u256']['input']>;
  idGTE?: InputMaybe<Scalars['u256']['input']>;
  idLT?: InputMaybe<Scalars['u256']['input']>;
  idLTE?: InputMaybe<Scalars['u256']['input']>;
  idNEQ?: InputMaybe<Scalars['u256']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc1155Meta = {
  __typename?: 'ERC1155Meta';
  base_uri?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  symbol?: Maybe<Scalars['felt252']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc1155MetaConnection = {
  __typename?: 'ERC1155MetaConnection';
  edges?: Maybe<Array<Maybe<Erc1155MetaEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc1155MetaEdge = {
  __typename?: 'ERC1155MetaEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc1155Meta>;
};

export type Erc1155MetaOrder = {
  direction: OrderDirection;
  field: Erc1155MetaOrderField;
};

export enum Erc1155MetaOrderField {
  BaseUri = 'BASE_URI',
  Name = 'NAME',
  Symbol = 'SYMBOL',
  Token = 'TOKEN'
}

export type Erc1155MetaWhereInput = {
  base_uri?: InputMaybe<Scalars['felt252']['input']>;
  base_uriEQ?: InputMaybe<Scalars['felt252']['input']>;
  base_uriGT?: InputMaybe<Scalars['felt252']['input']>;
  base_uriGTE?: InputMaybe<Scalars['felt252']['input']>;
  base_uriLT?: InputMaybe<Scalars['felt252']['input']>;
  base_uriLTE?: InputMaybe<Scalars['felt252']['input']>;
  base_uriNEQ?: InputMaybe<Scalars['felt252']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbol?: InputMaybe<Scalars['felt252']['input']>;
  symbolEQ?: InputMaybe<Scalars['felt252']['input']>;
  symbolGT?: InputMaybe<Scalars['felt252']['input']>;
  symbolGTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolLT?: InputMaybe<Scalars['felt252']['input']>;
  symbolLTE?: InputMaybe<Scalars['felt252']['input']>;
  symbolNEQ?: InputMaybe<Scalars['felt252']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Erc1155OperatorApproval = {
  __typename?: 'ERC1155OperatorApproval';
  approved?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  operator?: Maybe<Scalars['ContractAddress']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Erc1155OperatorApprovalConnection = {
  __typename?: 'ERC1155OperatorApprovalConnection';
  edges?: Maybe<Array<Maybe<Erc1155OperatorApprovalEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc1155OperatorApprovalEdge = {
  __typename?: 'ERC1155OperatorApprovalEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Erc1155OperatorApproval>;
};

export type Erc1155OperatorApprovalOrder = {
  direction: OrderDirection;
  field: Erc1155OperatorApprovalOrderField;
};

export enum Erc1155OperatorApprovalOrderField {
  Approved = 'APPROVED',
  Operator = 'OPERATOR',
  Owner = 'OWNER',
  Token = 'TOKEN'
}

export type Erc1155OperatorApprovalWhereInput = {
  approved?: InputMaybe<Scalars['bool']['input']>;
  operator?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  operatorNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type ModelUnion = Challenge | Coin | Config | Duelist | Erc20Allowance | Erc20AllowanceModel | Erc20Balance | Erc20BalanceModel | Erc20BridgeableModel | Erc20Meta | Erc20MetadataModel | Erc721Balance | Erc721Meta | Erc721OperatorApproval | Erc721Owner | Erc721TokenApproval | Erc1155Balance | Erc1155Meta | Erc1155OperatorApproval | InitializableModel | Pact | Round | Src5Model | Wager;

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
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  pair?: InputMaybe<Scalars['u128']['input']>;
  pairEQ?: InputMaybe<Scalars['u128']['input']>;
  pairGT?: InputMaybe<Scalars['u128']['input']>;
  pairGTE?: InputMaybe<Scalars['u128']['input']>;
  pairLT?: InputMaybe<Scalars['u128']['input']>;
  pairLTE?: InputMaybe<Scalars['u128']['input']>;
  pairNEQ?: InputMaybe<Scalars['u128']['input']>;
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
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  round_number?: InputMaybe<Scalars['u8']['input']>;
  round_numberEQ?: InputMaybe<Scalars['u8']['input']>;
  round_numberGT?: InputMaybe<Scalars['u8']['input']>;
  round_numberGTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberLT?: InputMaybe<Scalars['u8']['input']>;
  round_numberLTE?: InputMaybe<Scalars['u8']['input']>;
  round_numberNEQ?: InputMaybe<Scalars['u8']['input']>;
  state?: InputMaybe<Scalars['u8']['input']>;
  stateEQ?: InputMaybe<Scalars['u8']['input']>;
  stateGT?: InputMaybe<Scalars['u8']['input']>;
  stateGTE?: InputMaybe<Scalars['u8']['input']>;
  stateLT?: InputMaybe<Scalars['u8']['input']>;
  stateLTE?: InputMaybe<Scalars['u8']['input']>;
  stateNEQ?: InputMaybe<Scalars['u8']['input']>;
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

export type Src5Model = {
  __typename?: 'SRC5Model';
  entity?: Maybe<World__Entity>;
  interface_id?: Maybe<Scalars['felt252']['output']>;
  supports?: Maybe<Scalars['bool']['output']>;
  token?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Src5ModelConnection = {
  __typename?: 'SRC5ModelConnection';
  edges?: Maybe<Array<Maybe<Src5ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Src5ModelEdge = {
  __typename?: 'SRC5ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Src5Model>;
};

export type Src5ModelOrder = {
  direction: OrderDirection;
  field: Src5ModelOrderField;
};

export enum Src5ModelOrderField {
  InterfaceId = 'INTERFACE_ID',
  Supports = 'SUPPORTS',
  Token = 'TOKEN'
}

export type Src5ModelWhereInput = {
  interface_id?: InputMaybe<Scalars['felt252']['input']>;
  interface_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  interface_idGT?: InputMaybe<Scalars['felt252']['input']>;
  interface_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  interface_idLT?: InputMaybe<Scalars['felt252']['input']>;
  interface_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  interface_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  supports?: InputMaybe<Scalars['bool']['input']>;
  token?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  tokenNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Wager = {
  __typename?: 'Wager';
  coin?: Maybe<Scalars['u8']['output']>;
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
  Coin = 'COIN',
  DuelId = 'DUEL_ID',
  Fee = 'FEE',
  Value = 'VALUE'
}

export type WagerWhereInput = {
  coin?: InputMaybe<Scalars['u8']['input']>;
  coinEQ?: InputMaybe<Scalars['u8']['input']>;
  coinGT?: InputMaybe<Scalars['u8']['input']>;
  coinGTE?: InputMaybe<Scalars['u8']['input']>;
  coinLT?: InputMaybe<Scalars['u8']['input']>;
  coinLTE?: InputMaybe<Scalars['u8']['input']>;
  coinNEQ?: InputMaybe<Scalars['u8']['input']>;
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duel_idEQ?: InputMaybe<Scalars['u128']['input']>;
  duel_idGT?: InputMaybe<Scalars['u128']['input']>;
  duel_idGTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idLT?: InputMaybe<Scalars['u128']['input']>;
  duel_idLTE?: InputMaybe<Scalars['u128']['input']>;
  duel_idNEQ?: InputMaybe<Scalars['u128']['input']>;
  fee?: InputMaybe<Scalars['u256']['input']>;
  feeEQ?: InputMaybe<Scalars['u256']['input']>;
  feeGT?: InputMaybe<Scalars['u256']['input']>;
  feeGTE?: InputMaybe<Scalars['u256']['input']>;
  feeLT?: InputMaybe<Scalars['u256']['input']>;
  feeLTE?: InputMaybe<Scalars['u256']['input']>;
  feeNEQ?: InputMaybe<Scalars['u256']['input']>;
  value?: InputMaybe<Scalars['u256']['input']>;
  valueEQ?: InputMaybe<Scalars['u256']['input']>;
  valueGT?: InputMaybe<Scalars['u256']['input']>;
  valueGTE?: InputMaybe<Scalars['u256']['input']>;
  valueLT?: InputMaybe<Scalars['u256']['input']>;
  valueLTE?: InputMaybe<Scalars['u256']['input']>;
  valueNEQ?: InputMaybe<Scalars['u256']['input']>;
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

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  coinModels?: Maybe<CoinConnection>;
  configModels?: Maybe<ConfigConnection>;
  duelistModels?: Maybe<DuelistConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  erc20AllowanceModelModels?: Maybe<Erc20AllowanceModelConnection>;
  erc20AllowanceModels?: Maybe<Erc20AllowanceConnection>;
  erc20BalanceModelModels?: Maybe<Erc20BalanceModelConnection>;
  erc20BalanceModels?: Maybe<Erc20BalanceConnection>;
  erc20BridgeableModelModels?: Maybe<Erc20BridgeableModelConnection>;
  erc20MetaModels?: Maybe<Erc20MetaConnection>;
  erc20MetadataModelModels?: Maybe<Erc20MetadataModelConnection>;
  erc721BalanceModels?: Maybe<Erc721BalanceConnection>;
  erc721MetaModels?: Maybe<Erc721MetaConnection>;
  erc721OperatorApprovalModels?: Maybe<Erc721OperatorApprovalConnection>;
  erc721OwnerModels?: Maybe<Erc721OwnerConnection>;
  erc721TokenApprovalModels?: Maybe<Erc721TokenApprovalConnection>;
  erc1155BalanceModels?: Maybe<Erc1155BalanceConnection>;
  erc1155MetaModels?: Maybe<Erc1155MetaConnection>;
  erc1155OperatorApprovalModels?: Maybe<Erc1155OperatorApprovalConnection>;
  events?: Maybe<World__EventConnection>;
  initializableModelModels?: Maybe<InitializableModelConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  pactModels?: Maybe<PactConnection>;
  roundModels?: Maybe<RoundConnection>;
  src5ModelModels?: Maybe<Src5ModelConnection>;
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


export type World__QueryCoinModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CoinOrder>;
  where?: InputMaybe<CoinWhereInput>;
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


export type World__QueryErc20AllowanceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20AllowanceOrder>;
  where?: InputMaybe<Erc20AllowanceWhereInput>;
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


export type World__QueryErc20BalanceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20BalanceOrder>;
  where?: InputMaybe<Erc20BalanceWhereInput>;
};


export type World__QueryErc20BridgeableModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20BridgeableModelOrder>;
  where?: InputMaybe<Erc20BridgeableModelWhereInput>;
};


export type World__QueryErc20MetaModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc20MetaOrder>;
  where?: InputMaybe<Erc20MetaWhereInput>;
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


export type World__QueryErc721BalanceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc721BalanceOrder>;
  where?: InputMaybe<Erc721BalanceWhereInput>;
};


export type World__QueryErc721MetaModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc721MetaOrder>;
  where?: InputMaybe<Erc721MetaWhereInput>;
};


export type World__QueryErc721OperatorApprovalModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc721OperatorApprovalOrder>;
  where?: InputMaybe<Erc721OperatorApprovalWhereInput>;
};


export type World__QueryErc721OwnerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc721OwnerOrder>;
  where?: InputMaybe<Erc721OwnerWhereInput>;
};


export type World__QueryErc721TokenApprovalModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc721TokenApprovalOrder>;
  where?: InputMaybe<Erc721TokenApprovalWhereInput>;
};


export type World__QueryErc1155BalanceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc1155BalanceOrder>;
  where?: InputMaybe<Erc1155BalanceWhereInput>;
};


export type World__QueryErc1155MetaModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc1155MetaOrder>;
  where?: InputMaybe<Erc1155MetaWhereInput>;
};


export type World__QueryErc1155OperatorApprovalModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Erc1155OperatorApprovalOrder>;
  where?: InputMaybe<Erc1155OperatorApprovalWhereInput>;
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


export type World__QuerySrc5ModelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Src5ModelOrder>;
  where?: InputMaybe<Src5ModelWhereInput>;
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
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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

export type ChallengeFieldsFragment = { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null };

export type GetChallengesByIdQueryVariables = Exact<{
  duel_id: Scalars['u128']['input'];
}>;


export type GetChallengesByIdQuery = { __typename?: 'World__Query', challenges?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByStateQueryVariables = Exact<{
  state: Scalars['u8']['input'];
}>;


export type GetChallengesByStateQuery = { __typename?: 'World__Query', challenges?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByStatesQueryVariables = Exact<{
  state1: Scalars['u8']['input'];
  state2: Scalars['u8']['input'];
}>;


export type GetChallengesByStatesQuery = { __typename?: 'World__Query', challenges_1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByDuelistAndStateQueryVariables = Exact<{
  address: Scalars['ContractAddress']['input'];
  state: Scalars['u8']['input'];
}>;


export type GetChallengesByDuelistAndStateQuery = { __typename?: 'World__Query', challenges_a?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengesByDuelistAndStatesQueryVariables = Exact<{
  address: Scalars['ContractAddress']['input'];
  state1: Scalars['u8']['input'];
  state2: Scalars['u8']['input'];
}>;


export type GetChallengesByDuelistAndStatesQuery = { __typename?: 'World__Query', challenges_a1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_a2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b1?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null, challenges_b2?: { __typename?: 'ChallengeConnection', edges?: Array<{ __typename?: 'ChallengeEdge', node?: { __typename?: 'Challenge', duel_id?: any | null, duelist_a?: any | null, duelist_b?: any | null, message?: any | null, round_number?: any | null, state?: any | null, timestamp_end?: any | null, timestamp_start?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetChallengeDependenciesQueryVariables = Exact<{
  duel_id?: InputMaybe<Scalars['u128']['input']>;
  duelist_a?: InputMaybe<Scalars['ContractAddress']['input']>;
  duelist_b?: InputMaybe<Scalars['ContractAddress']['input']>;
}>;


export type GetChallengeDependenciesQuery = { __typename?: 'World__Query', wager?: { __typename?: 'WagerConnection', edges?: Array<{ __typename?: 'WagerEdge', node?: { __typename?: 'Wager', coin?: any | null, fee?: any | null, value?: any | null } | null } | null> | null } | null, duelist_a?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null, honour?: any | null, timestamp?: any | null } | null } | null> | null } | null, duelist_b?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null, honour?: any | null, timestamp?: any | null } | null } | null> | null } | null };

export type DuelistFieldsFragment = { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null, honour?: any | null, timestamp?: any | null };

export type GetDuelistsByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ContractAddress']['input']>;
}>;


export type GetDuelistsByAddressQuery = { __typename?: 'World__Query', duelistModels?: { __typename?: 'DuelistConnection', edges?: Array<{ __typename?: 'DuelistEdge', node?: { __typename?: 'Duelist', address?: any | null, name?: any | null, profile_pic?: any | null, total_duels?: any | null, total_wins?: any | null, total_losses?: any | null, total_draws?: any | null, total_honour?: any | null, honour?: any | null, timestamp?: any | null } | null } | null> | null } | null };

export const ChallengeFieldsFragmentDoc = gql`
    fragment challengeFields on Challenge {
  duel_id
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
  total_duels
  total_wins
  total_losses
  total_draws
  total_honour
  honour
  timestamp
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
    query getChallengeDependencies($duel_id: u128, $duelist_a: ContractAddress, $duelist_b: ContractAddress) {
  wager: wagerModels(where: {duel_id: $duel_id}) {
    edges {
      node {
        coin
        fee
        value
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