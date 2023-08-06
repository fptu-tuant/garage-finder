import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="vi" className="dark">
      <Head>
        <Script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA0WrEq6hrP4JrxkWX-TYKrUtu2D7yIJo&libraries=places"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
