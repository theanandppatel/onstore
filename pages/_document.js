import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='overflow-x-hidden scrollbar-hide'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src='https://accounts.google.com/gsi/client'/>
      </body>
    </Html>
  )
}