import { Image } from 'semantic-ui-react'

export default function Logo({
  width = 200
}) {
  return <Image src='/images/logo.png' width={width} height={width} centered />
}
