import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html className='overflow-x-hidden scrollbar-hide'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src='https://accounts.google.com/gsi/client'/>
      </body>
    </Html>
  )
}