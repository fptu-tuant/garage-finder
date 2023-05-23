import { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
