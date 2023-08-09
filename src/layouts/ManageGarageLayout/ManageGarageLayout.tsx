import {
  AuditOutlined,
  BarcodeOutlined,
  CalendarOutlined,
  CarOutlined,
  FileImageOutlined,
  HistoryOutlined,
  ScheduleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Skeleton } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { isNil } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo } from 'react';

import { useGetGarageByIdApi } from '@/api';
import { useAuthStore } from '@/context';
import { PinMapFilledIcon, UserEditIcon, UsersIcon } from '@/icons';
import { getGarageDetailAddress } from '@/services';

import { MainLayout } from '../MainLayout/Layout';

const { Sider, Content } = Layout;

export function ManageGarageLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const [{ user }] = useAuthStore();

  const { data: garage, isLoading: fetchingGarage } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(router.query?.garageId)) },
    { id: Number(router.query?.garageId) }
  );

  useEffect(() => {
    if (isNil(router.query?.garageId)) {
      router.replace('/my-garages');
    }
  }, [router]);

  const MENU_ITEMS: ItemType[] = [
    {
      key: '/my-garages/manage/info',
      label: (
        <Link
          href={{ pathname: '/my-garages/manage/info', query: router.query }}
          className="flex gap-2 items-center"
        >
          <UserEditIcon className="text-lg" />
          <span className="ms-[18px]">Thông tin Garage</span>
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
    {
      key: '/my-garages/manage/brand',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/brand',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <CarOutlined className="text-lg" />
          <span>Quản lý hãng xe</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/history',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/history',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <HistoryOutlined className="text-lg" />
          <span>Lịch sử sữa chữa</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/staff',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/staff',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <UsersIcon className="text-lg" />
          <span className="ms-[18px]">Quản lý nhân viên</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/transaction',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/transaction',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <AuditOutlined className="text-lg" />
          <span className="ms-[18px]">Giao dịch</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/subscriptions',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/subscriptions',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <BarcodeOutlined className="text-lg" />
          <span className="ms-[18px]">Gói thành viên</span>
        </Link>
      ),
    },
    {
      key: '/my-garages/manage/chat',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/chat',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <WechatOutlined className="text-lg" />
          <span className="ms-[18px]">Tin nhắn</span>
        </Link>
      ),
    },
  ];

  const STAFF_MENU_ITEMS = [
    {
      key: '/staff/my-info',
      label: (
        <Link
          href={{
            pathname: '/staff/my-info',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <UserEditIcon className="text-lg" />
          <span className="ms-[18px]">Thông tin cá nhân</span>
        </Link>
      ),
    },
    MENU_ITEMS[2],
    MENU_ITEMS[5],
    {
      key: '/my-garages/manage/chat',
      label: (
        <Link
          href={{
            pathname: '/my-garages/manage/chat',
            query: router.query,
          }}
          className="flex gap-2 items-center"
        >
          <WechatOutlined className="text-lg" />
          <span className="ms-[18px]">Tin nhắn</span>
        </Link>
      ),
    },
  ];

  const selectedKey = router.pathname.split('/').slice(0, 4).join('/');

  const addressDetail = useMemo(() => {
    try {
      const { label } = JSON.parse(garage?.addressDetail ?? '');

      return label;
    } catch (error) {
      return '';
    }
  }, [garage?.addressDetail]);

  if (isNil(router.query?.garageId)) {
    return null;
  }

  return (
    <MainLayout>
      <Layout hasSider className="bg-transparent mt-20">
        <Sider className="text-center bg-transparent" width={300}>
          <div className="mb-10">
            <Skeleton active loading={fetchingGarage}>
              <h2>{garage?.garageName}</h2>
              <div className="flex gap-2 items-center justify-center">
                <PinMapFilledIcon className="text-xl text-rose-600" />
                <span>{getGarageDetailAddress(addressDetail)}</span>
              </div>
            </Skeleton>
          </div>

          <Menu
            selectedKeys={[selectedKey]}
            items={user?.role === 'STAFF' ? STAFF_MENU_ITEMS : MENU_ITEMS}
          />
        </Sider>
        <Content className="flex flex-col pr-6 pl-10">{children}</Content>
      </Layout>
    </MainLayout>
  );
}
