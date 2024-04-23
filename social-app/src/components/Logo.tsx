import { RevealContent, Image, Reveal } from 'semantic-ui-react'

export default function Logo({
  width = 300
}) {
  // return <Image src='/images/logo.png' width={width} height={width} centered />
  return (
    <Reveal animated='move up'>
      <RevealContent visible>
        <Image src='/images/logo.jpg' width={width} height={width} centered />
      </RevealContent>
      <RevealContent hidden>
        <Image src='/images/logo2.jpg' width={width} height={width} centered />
      </RevealContent>
    </Reveal>
  )
}
