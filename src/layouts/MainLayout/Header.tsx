import { Button, Divider } from 'antd';
import Link from 'next/link';

import { twcx } from '@/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header className={twcx(className, 'h-20 px-4 flex items-center')}>
      <div>
        <div className="uppercase font-bold">
          <span>Garage</span> <span className="text-primary">Finder</span>
        </div>
      </div>
      <nav className="grow flex justify-end">
        <ul className="flex gap-8">
          <li>
            <Link href="/">Trang chủ</Link>
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
        <Button size="large" className="border-primary text-primary">
          Đăng Nhập
        </Button>
      </div>
    </header>
  );
}
