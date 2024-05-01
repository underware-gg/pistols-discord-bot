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


export const formatTimestamp = (t: number): string => {
  const timeUTC = new Date(t * 1000).getTime()
  const tzoffset = (new Date(0)).getTimezoneOffset() * 60000 // local timezone offset in milliseconds
  const localDate = new Date(timeUTC - tzoffset)
  const iso = localDate.toISOString()
  const [date, iso2] = iso.split('T')
  const [time, iso3] = iso2.split('.')
  const [hour, minutes, seconds] = time.split(':')
  return `${date} ${hour}:${minutes}`
}

export const formatTimestampElapsed = (start: number): string => {
  const now = Math.floor(new Date().getTime() / 1000)
  return formatTimestampDelta(start, now)
}

export const formatTimestampCountdown = (end: number): string => {
  const now = Math.floor(new Date().getTime() / 1000)
  return formatTimestampDelta(now, end)
}

export const formatTimestampDelta = (start: number, end: number): string => {
  const t = Math.max(0, end - start)
  const iso = (new Date(t * 1000).toISOString())
  const [date, iso2] = iso.split('T')
  const [time, iso3] = iso2.split('.')
  const [hour, minutes, seconds] = time.split(':')
  const days = Math.floor(t / (24 * 60 * 60))
  let result = ''
  if (days > 0) result += `${days}d `
  if (days > 0 || parseInt(hour) > 0) result += `${hour == '00' ? '0' : hour}h `
  return result + `${minutes}m ${seconds}s`
}
