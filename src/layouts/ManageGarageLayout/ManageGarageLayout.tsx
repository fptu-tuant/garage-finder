import { CalendarOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { UserEditIcon } from '@/icons';

import { MainLayout } from '../MainLayout/Layout';

const { Sider, Content } = Layout;

export function ManageGarageLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const MENU_ITEMS: ItemType[] = [
    {
      key: '/my-garages/manage/info',
      label: (
        <Link
          href={{ pathname: '/my-garages/manage/info', query: router.query }}
          className="flex gap-2 items-center"
        >
          <UserEditIcon className="text-lg" />
          <span>Thông tin Garage</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/order',
      label: (
        <Link
          href={{ pathname: '/my-garages/manage/order', query: router.query }}
          className="flex gap-2 items-center"
        >
          <CalendarOutlined className="text-lg" />
          <span>Quản lý lịch đặt</span>
        </Link>
      ),
    },
  ];

  return (
    <MainLayout>
      <Layout hasSider className="bg-transparent mt-20">
        <Sider className="text-center bg-transparent">
          <Menu selectedKeys={[router.pathname]} items={MENU_ITEMS} />
        </Sider>
        <Content className="flex flex-col pr-6 pl-10">{children}</Content>
      </Layout>
    </MainLayout>
  );
}
