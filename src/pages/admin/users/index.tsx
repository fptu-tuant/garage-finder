import { Button, Input, Table, Tag } from 'antd';
import { useState } from 'react';

import { useAdminChangeUserStatus, useAdminGetUsers } from '@/api';
import { AdminLayout } from '@/layouts';

const STATUS_NAMES = {
  active: 'Đang họat động',
  waiting: 'Chờ duyệt',
  denined: 'Bị từ chối',
  locked: 'Bị khóa',
};

const STATUS_COLORS = {
  active: 'green',
  waiting: 'orange',
  denined: 'grey',
  locked: 'red',
};

export default function AdminManageUsersPage() {
  const { data, isLoading, refetch } = useAdminGetUsers({
    variables: { body: {} },
  });

  const { mutateAsync: changeUserStatus, isLoading: buttonLoading } =
    useAdminChangeUserStatus();

  const [search, setSearch] = useState('');

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-10">
        <Input
          placeholder="Tìm theo tên .."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table
        loading={isLoading}
        columns={[
          {
            title: 'STT',
            render: (_, __, idx) => idx + 1,
          },
          {
            title: 'Tên người dùng',
            render: (_, item) => item.name,
          },
          {
            title: 'Số điện thoại',
            render: (_, item) => item.phoneNumber,
          },
          {
            title: 'Email',
            render: (_, item) => item.emailAddress,
          },
          {
            title: 'Địa chỉ',
            render: (_, item) => item.addressDetail,
          },
          {
            title: 'Sở hữu garage',
            render: (_, item) => (item.haveGarage ? 'Có' : 'Không'),
          },
          {
            title: 'Trạng thái',
            render: (_, item) => (
              <Tag
                className="rounded-full"
                color={
                  STATUS_COLORS[
                    item.status as unknown as keyof typeof STATUS_NAMES
                  ]
                }
              >
                {STATUS_NAMES[
                  item.status as unknown as keyof typeof STATUS_NAMES
                ] ?? item.status}
              </Tag>
            ),
          },
          {
            title: 'Hoạt động',
            render: (_, item) => (
              <div className="flex gap-3">
                {item.status === 'active' && (
                  <Button
                    onClick={async () => {
                      await changeUserStatus({
                        body: { userId: item.userID, status: 'locked' },
                      });
                      await refetch();
                    }}
                    disabled={buttonLoading}
                  >
                    Khóa
                  </Button>
                )}
                {item.status === 'locked' && (
                  <Button
                    onClick={async () => {
                      await changeUserStatus({
                        body: { userId: item.userID, status: 'active' },
                      });
                      await refetch();
                    }}
                    disabled={buttonLoading}
                  >
                    Mở Khóa
                  </Button>
                )}
              </div>
            ),
          },
        ]}
        dataSource={filteredData}
      />
    </div>
  );
}

AdminManageUsersPage.Layout = AdminLayout;
