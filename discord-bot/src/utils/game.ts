import { BigNumberish } from "starknet";
import { bigintToHex } from "./misc.js";

export const makeLogoUrl = (): string => {
  return `${process.env.CLIENT_URL}/images/logo.png`;
}

export const makeSquareProfilePicUrl = (profile_pic: number): string => {
  return `${process.env.CLIENT_URL}/profiles/${('00' + profile_pic).slice(-2)}_sq.jpg`;
}

export const makeFullProfilePicUrl = (profile_pic: number): string => {
  return `${process.env.CLIENT_URL}/profiles/${('00' + profile_pic).slice(-2)}_a.jpg`;
}

export const makeDuelUrl = (duel_id: BigNumberish): string => {
  return `${process.env.CLIENT_URL}/duel/${bigintToHex(duel_id)}`;
}
