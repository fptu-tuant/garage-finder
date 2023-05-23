import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { FC, PropsWithChildren } from 'react';

declare module 'next/app' {
  type PageLayout<P extends PropsWithChildren = PropsWithChildren> = FC<P>;

  type CustomPage<P = Record<string, unknown>> = NextPage<P> & {
    Layout?: PageLayout;
    title?: string;
  };

  export type CustomAppProps<P = Record<string, unknown>> = AppProps & {
    Component: CustomPage<P>;
  };
}
