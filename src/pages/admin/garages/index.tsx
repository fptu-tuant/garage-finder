import { Button, Input, Table, Tag } from 'antd';
import { useState } from 'react';

import {
  useAdminChangeGarageStatus,
  useAdminGetGarages,
  useAdminGetUsers,
} from '@/api';
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

const getGarageDetailAddress = (detail?: string) => {
  try {
    const { label } = JSON.parse(detail ?? '');

    return label;
  } catch (error) {
    return '';
  }
};

export default function AdminManageGaragesPage() {
  const {
    data: garages,
    isLoading,
    refetch,
  } = useAdminGetGarages({
    variables: { body: {} },
  });
  const { data: users } = useAdminGetUsers({
    queryKey: 'users-admin',
    variables: { body: {} },
  });

  const { mutateAsync: changeGarageStatus, isLoading: buttonLoading } =
    useAdminChangeGarageStatus();

  const [search, setSearch] = useState('');

  const filteredData = garages
    ?.filter((item) =>
      item.garageName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => item.status !== 'waiting');

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
            title: 'Tên Garage',
            render: (_, item) => item.garageName,
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
            render: (_, item) => getGarageDetailAddress(item.addressDetail),
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
            title: 'Chủ garage',
            render: (_, item) =>
              users?.find((user) => user.userID === item.userID)?.name,
          },
          {
            title: 'Hoạt động',
            render: (_, item) => (
              <div className="flex gap-3">
                {item.status === 'waiting' && (
                  <Button
                    onClick={async () => {
                      await changeGarageStatus({
                        body: { garageId: item.garageID, status: 'active' },
                      });
                      await refetch();
                    }}
                    disabled={buttonLoading}
                  >
                    Chấp nhận
                  </Button>
                )}
                {item.status === 'waiting' && (
                  <Button
                    onClick={async () => {
                      await changeGarageStatus({
                        body: { garageId: item.garageID, status: 'denined' },
                      });
                      await refetch();
                    }}
                    disabled={buttonLoading}
                  >
                    Từ chối
                  </Button>
                )}
                {item.status === 'active' && (
                  <Button
                    onClick={async () => {
                      await changeGarageStatus({
                        body: { garageId: item.garageID, status: 'locked' },
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
                      await changeGarageStatus({
                        body: { garageId: item.garageID, status: 'active' },
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

AdminManageGaragesPage.Layout = AdminLayout;
