import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { UserEditIcon } from '@/icons';

import { MainLayout } from '../MainLayout/Layout';

const { Sider, Content } = Layout;

const MENU_ITEMS: ItemType[] = [
  {
    key: '/my-garages/manage/info',
    label: (
      <Link href="/my-garages/manage/info" className="flex gap-2 items-center">
        <UserEditIcon className="text-lg" />
        <span>Thông tin Garage</span>
      </Link>
    ),
  },
];

export function ManageGarageLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <MainLayout>
      <Layout hasSider className="bg-transparent mt-20">
        <Sider className="text-center bg-transparent">
          <Menu selectedKeys={[router.pathname]} items={MENU_ITEMS} />;
        </Sider>
        <Content className="flex flex-col pr-6 pl-10">{children}</Content>
      </Layout>
    </MainLayout>
  );
}
