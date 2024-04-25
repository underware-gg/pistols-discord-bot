import { shortString, BigNumberish } from 'starknet'

export const stringToFelt = (v: string): string => (v ? shortString.encodeShortString(v) : '0x0')
export const feltToString = (v: BigNumberish): string => (BigInt(v) > 0n ? shortString.decodeShortString(bigintToHex(v)) : '')

export const bigintEquals = (a: BigNumberish | null, b: BigNumberish | null): boolean => (a != null && b != null && BigInt(a) == BigInt(b))
export const bigintToHex = (v: BigNumberish): string => (!v ? '0x0' : `0x${BigInt(v).toString(16)}`)

export const shortAddress = (address: string | null) => (
    !address ? '?'
        : !address.startsWith('0x') ? `(${address})`  // not hex
            : address.length < 12 ? address           // size is good
                : `${address.slice(0, 6)}..${address.slice(-4)}`
)

