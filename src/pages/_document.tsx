import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi" className="dark">
      <Head>
        {/* <Script src="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
