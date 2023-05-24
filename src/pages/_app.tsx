import '@/styles/index.css';

import type { CustomAppProps } from 'next/app';
import Head from 'next/head';

import { fontMono, fontSans } from '@/assets/fonts';
import { AntConfigProvider } from '@/configs';
import { MainLayout } from '@/layouts';
import { twcx } from '@/utils';

export default function App({ Component, pageProps }: CustomAppProps) {
  const { Layout = MainLayout, title = 'Garage Finder' } = Component;

  return (
    <AntConfigProvider>
      <div
        className={twcx(
          fontMono.variable,
          fontSans.variable,
          fontSans.className
        )}
      >
        <Head>
          <title>{title}</title>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </AntConfigProvider>
  );
}
