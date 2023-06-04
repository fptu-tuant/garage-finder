import { LogoutOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Dropdown, Typography } from 'antd';
import Link from 'next/link';

import { useAuthStore } from '@/context';
import { BellIcon, EnvelopIcon, UserIcon } from '@/icons';
import { twcx } from '@/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const [{ user }, dispatch] = useAuthStore();

  const onLogout = () => {
    dispatch({ type: 'SIGN_OUT' });
  };

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
          <li>
            <Link href="/garages">Trang chủ</Link>
          </li>
          <li>
            <Link href="/service">Dịch vụ</Link>
          </li>
          <li>
            <Link href="/about">Về chúng tôi</Link>
          </li>
          <li>
            <Link href="/contact">Liên hệ</Link>
          </li>
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
            <Button className="border-primary text-primary">Đăng Nhập</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
