import { NextIntlProvider } from 'next-intl';
import { PropsWithChildren } from 'react';

import { TranslateProvider, useTranslateStore } from '@/context';
import { translates } from '@/translate';

function TranslateIntlProviderContainer({ children }: PropsWithChildren) {
  const [{ lang }] = useTranslateStore();

  return (
    <NextIntlProvider messages={translates[lang]}>{children}</NextIntlProvider>
  );
}

export function TranslateIntlProvider({ children }: PropsWithChildren) {
  return (
    <TranslateProvider>
      <TranslateIntlProviderContainer>
        {children}
      </TranslateIntlProviderContainer>
    </TranslateProvider>
  );
}
