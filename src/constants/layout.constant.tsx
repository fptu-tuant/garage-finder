import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';

import { CarIcon, UserEditIcon } from '@/icons';

export const MENU_ITEMS: ItemType[] = [
  {
    key: '/manage/my-info',
    label: (
      <Link href="/manage/my-info" className="flex gap-2 items-center">
        <UserEditIcon className="text-lg" />
        <span>Thông tin cá nhân</span>
      </Link>
    ),
  },
  {
    key: '/manage/my-cars',
    label: (
      <Link href="/manage/my-cars" className="flex gap-2 items-center">
        <CarIcon className="text-lg" />
        <span>Xe của tôi</span>
      </Link>
    ),
  },
];
