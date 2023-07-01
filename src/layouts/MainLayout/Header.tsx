import { LogoutOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Dropdown, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import FlagUK from '@/assets/images/flag-uk.svg';
import FlagVN from '@/assets/images/flag-vn.svg';
import { MENU_ITEMS } from '@/constants';
import { useAuthStore, useTranslateStore } from '@/context';
import { BellIcon, EnvelopIcon, UserIcon } from '@/icons';
import { twcx } from '@/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const t = useTranslations();
  const [{ lang }, translateDispatch] = useTranslateStore();

  const [{ user }, authDispatch] = useAuthStore();
  const hadLogin = !!user;

  const { asPath, push } = useRouter();
  const [, currentPath] = asPath.split('/');

  const onLogout = () => {
    authDispatch({ type: 'SIGN_OUT' });
    push('/');
  };

  const NAV_ITEMS = [
    { href: '/', name: t('header.home') },
    { href: '/garages', name: t('header.listGarages') },
    { href: '/service', name: t('header.services') },
    { href: '/about', name: t('header.aboutUs') },
    { href: '/contact', name: t('header.contact') },
    { href: '/my-garages', name: t('header.myGarage'), hide: !hadLogin },
  ];

  return (
    <header
      className={twcx(className, 'h-20 flex items-center container mx-auto')}
    >
      <Link className="block" href="/">
        <div className="uppercase font-bold">
          <span>Garage</span> <span className="text-primary">Finder</span>
        </div>
      </Link>
      <nav className="grow flex justify-end">
        <ul className="flex gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={twcx({
                  ['text-blue-600']: `/${currentPath}` === item.href,
                  ['hidden']: item.hide,
                })}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Divider type="vertical" className="h-8 bg-gray-800 mx-8" />

      <div>
        {user ? (
          <div className="flex gap-6 items-center">
            <div className="rounded-full p-2 flex items-center justify-center w-4 h-4 border-slate-100 shadow-md">
              <Badge dot>
                <BellIcon className="text-xl text-neutral-700 cursor-pointer" />
              </Badge>
            </div>

            <div className="rounded-full p-2 flex items-center justify-center w-4 h-4 border-slate-100 shadow-md">
              <EnvelopIcon className="text-xl text-neutral-700 cursor-pointer" />
            </div>

            <Dropdown
              menu={{
                items: [
                  ...MENU_ITEMS,
                  {
                    key: 'logout',
                    label: (
                      <div
                        className="flex gap-2"
                        role="button"
                        tabIndex={0}
                        onMouseUp={onLogout}
                      >
                        <LogoutOutlined />
                        <span>Đăng xuất</span>
                      </div>
                    ),
                    danger: true,
                  },
                ],
              }}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <UserIcon className="text-2xl text-neutral-700" />
                <Typography>{user.fullName}</Typography>
              </div>
            </Dropdown>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="border-primary text-primary">Đăng nhập</Button>
          </Link>
        )}
      </div>

      <div
        className="ml-4 h-[30px] rounded overflow-hidden cursor-pointer"
        role="button"
        tabIndex={0}
        onMouseDown={() =>
          translateDispatch({
            type: 'CHANGE_LANG',
            payload: {
              lang: lang === 'vi' ? 'en' : 'vi',
            },
          })
        }
      >
        {lang === 'vi' ? <FlagVN /> : <FlagUK />}
      </div>
    </header>
  );
}
