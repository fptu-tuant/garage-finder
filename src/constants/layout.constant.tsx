import {
  HeartOutlined,
  LockOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
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
  {
    key: '/manage/my-favorite',
    label: (
      <Link href="/manage/my-favorite" className="flex gap-2 items-center">
        <HeartOutlined className="text-lg" />
        <span className="m-0">Garage yêu thích</span>
      </Link>
    ),
  },
  {
    key: '/manage/change-password',
    label: (
      <Link href="/manage/change-password" className="flex gap-2 items-center">
        <LockOutlined className="text-lg" />
        <span className="m-0">Đổi mật khẩu</span>
      </Link>
    ),
  },
  {
    key: '/manage/order',
    label: (
      <Link href="/manage/order" className="flex gap-2 items-center">
        <ScheduleOutlined className="text-lg" />
        <span className="m-0">Quản lý lịch đặt</span>
      </Link>
    ),
  },
];
