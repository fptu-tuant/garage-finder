import { useRouter } from 'next/router';

import { twcx } from '@/utils';

export function Logo() {
  const { asPath } = useRouter();

  const isHomePage = asPath === '/';

  return (
    <div className="relative h-8 w-8 mr-2">
      <div
        className={twcx(
          'absolute top-0 left-0 h-2/3 w-2/3 bg-slate-300 rounded-full border-2 box-content',
          'dark:border-slate-900',
          'border-white',
          { ['z-10']: isHomePage }
        )}
      />
      <div
        className={twcx(
          'absolute bottom-0 right-0 h-2/3 w-2/3 bg-lavender-500 rounded',
          'dark:border-slate-900',
          'border-white',
          isHomePage ? 'border' : 'border-2'
        )}
      />
    </div>
  );
}
