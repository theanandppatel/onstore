import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Document() {
  return (
    <Html className='overflow-x-hidden scrollbar-hide'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="https://accounts.google.com/gsi/client" />
        <Script src="/google-signin.js" />

        {/* vercel packages */}
        <Analytics />
        <SpeedInsights />
        
      </body>
    </Html>
  )
}