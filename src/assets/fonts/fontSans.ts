import { Montserrat } from 'next/font/google';

export const fontSans = Montserrat({
  display: 'block',
  subsets: ['vietnamese'],
  preload: true,
  variable: '--font-sans',
});
