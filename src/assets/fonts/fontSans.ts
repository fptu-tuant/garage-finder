import { Work_Sans } from 'next/font/google';

export const fontSans = Work_Sans({
  weight: '400',
  display: 'block',
  subsets: ['latin-ext'],
  preload: true,
  variable: '--font-sans',
});
