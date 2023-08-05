import { LogoutOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Popover,
  Tooltip,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useSocket } from '@/api';
import FlagUK from '@/assets/images/flag-uk.svg';
import FlagVN from '@/assets/images/flag-vn.svg';
import { MENU_ITEMS } from '@/constants';
import { useAuthStore, useTranslateStore } from '@/context';
import { BellIcon, EnvelopIcon } from '@/icons';
import { isWsNotification } from '@/services/websocket.service';
import { twcx } from '@/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const t = useTranslations();
  const [{ lang }, translateDispatch] = useTranslateStore();

  const { lastJsonMessage, getAllNotifications, readAllNotifications } =
    useSocket();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isWsNotification(lastJsonMessage)) {
      getAllNotifications();
    }
  }, [getAllNotifications, lastJsonMessage]);

  const [{ user }, authDispatch] = useAuthStore();
  const hadLogin = !!user;

  const { asPath, push } = useRouter();
  const [, currentPath] = asPath.split('/');

  const onLogout = () => {
    push('/');
    authDispatch({ type: 'SIGN_OUT' });
  };

  const NAV_ITEMS = [
    { href: '/', name: t('header.home') },
    { href: '/garages', name: t('header.listGarages') },
    { href: '#service', name: t('header.services') },
    { href: '#about', name: t('header.aboutUs') },
    { href: '#contact', name: t('header.contact') },
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
      <nav className={twcx('grow flex justify-end')}>
        <ul
          className={twcx('flex gap-8', {
            ['hidden']: user?.role === 'STAFF',
          })}
        >
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

      <Divider
        type="vertical"
        className={twcx('h-8 bg-gray-800 mx-8', {
          ['hidden']: user?.role === 'STAFF',
        })}
      />

      <div>
        {user ? (
          <div className="flex gap-6 items-center">
            <div className="rounded-full p-2 flex items-center justify-center w-4 h-4 border-slate-100 shadow-md">
              <Popover placement="bottomLeft" content={<div>heheheehe</div>}>
                <Badge dot>
                  <BellIcon className="text-xl text-neutral-700 cursor-pointer" />
                </Badge>
              </Popover>
            </div>

            <div className="rounded-full p-2 flex items-center justify-center w-4 h-4 border-slate-100 shadow-md">
              <EnvelopIcon className="text-xl text-neutral-700 cursor-pointer" />
            </div>

            <Dropdown
              menu={{
                items: [
                  ...(user.role === 'STAFF' ? [] : MENU_ITEMS),
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
                <Avatar src={user.avatar} />
                <Typography>{user.fullName}</Typography>
              </div>
            </Dropdown>
          </div>
        ) : (
          <Link href="/sign-in ">
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
