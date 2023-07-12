import {
  CalendarOutlined,
  FileImageOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Skeleton } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { useGetGarageByIdApi } from '@/api';
import { PinMapFilledIcon, UserEditIcon } from '@/icons';

import { MainLayout } from '../MainLayout/Layout';

const { Sider, Content } = Layout;

export function ManageGarageLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const { data: garage, isLoading: fetchingGarage } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(router.query?.garageId)) },
    { id: Number(router.query?.garageId) }
  );

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
      key: '/my-garages/manage/gallery',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/gallery',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <FileImageOutlined className="text-lg" />
          <span>Thư viện ảnh</span>
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
    {
      key: '/my-garages/manage/services',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/services',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <ScheduleOutlined className="text-lg" />
          <span>Quản lý dịch vụ</span>
        </Link>
      ),
    },
  ];

  const selectedKey = router.pathname.split('/').slice(0, 4).join('/');

  return (
    <MainLayout>
      <Layout hasSider className="bg-transparent mt-20">
        <Sider className="text-center bg-transparent" width={300}>
          <div className="mb-10">
            <Skeleton active loading={fetchingGarage}>
              <h2>{garage?.garageName}</h2>
              <div className="flex gap-2 items-center justify-center">
                <PinMapFilledIcon className="text-xl text-rose-600" />
                <span>{garage?.addressDetail}</span>
              </div>
            </Skeleton>
          </div>

          <Menu selectedKeys={[selectedKey]} items={MENU_ITEMS} />
        </Sider>
        <Content className="flex flex-col pr-6 pl-10">{children}</Content>
      </Layout>
    </MainLayout>
  );
}
