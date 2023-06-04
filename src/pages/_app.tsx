import '@/styles/index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notification } from 'antd';
import type { CustomAppProps } from 'next/app';
import Head from 'next/head';

import { fontMono, fontSans } from '@/assets/fonts';
import { AntConfigProvider } from '@/configs';
import { AuthProvider } from '@/context';
import { MainLayout } from '@/layouts';
import { twcx } from '@/utils';

export default function App({ Component, pageProps }: CustomAppProps) {
  const [, contextHolder] = notification.useNotification();

  const { Layout = MainLayout, title = 'Garage Finder' } = Component;

  return (
    <AntConfigProvider>
      {contextHolder}
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
          >
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
          </GoogleOAuthProvider>
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntConfigProvider>
  );
}
