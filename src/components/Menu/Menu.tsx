import Link from 'next/link';
import { useState } from 'react';

import { useClickOutside } from '@/hooks';
import { TriangleIcon } from '@/icons';
import { twcx } from '@/utils';

const menuItems = [
  { href: '/writings', label: 'Writings' },
  { href: '/snippets', label: 'Snippets' },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className={twcx('relative')}>
      <button
        className={twcx(
          'flex gap-1 items-center font-bold text-sm rounded-full bg-blue-600/10 px-3 py-2 text-blue-400'
        )}
        onClick={() => setOpen(!open)}
      >
        <TriangleIcon className={twcx(open ? '-rotate-90' : 'rotate-90')} />
        <span>Menu</span>
      </button>

      {open && (
        <ul
          className={twcx(
            'absolute border border-slate-800 rounded-xl p-2 top-[calc(100%+6px)] right-0 min-w-[120px] z-10 flex flex-col gap-1 backdrop-blur bg-slate-900/80'
          )}
        >
          {menuItems.map((item) => (
            <li key={item.href} className="text-right">
              <Link
                className={twcx(
                  'text-sm text-blue-300 transition-all',
                  'hover:text-blue-400 hover:mr-2 hover:font-extrabold'
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
