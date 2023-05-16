import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='overflow-x-hidden scrollbar-hide'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}