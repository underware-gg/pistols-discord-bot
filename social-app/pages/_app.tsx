import 'semantic-ui-css/semantic.min.css'
import '/styles/fonts.scss'
import '/styles/styles.scss'
import React from 'react'
import { SessionProvider } from "next-auth/react";

function _app({ Component, pageProps: { session, ...pageProps } }) {
  return (
       <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

  )
}

export default _app