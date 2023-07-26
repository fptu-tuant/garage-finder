import { Input, Table } from 'antd';
import { useState } from 'react';

import { useAdminGetGarages, useAdminGetUsers } from '@/api';
import { AdminLayout } from '@/layouts';

export default function AdminManageGaragesPage() {
  const { data, isLoading } = useAdminGetGarages();
  const { data: users } = useAdminGetUsers({ queryKey: 'users-admin' });

  const [search, setSearch] = useState('');

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
            render: (_, item) => item.addressDetail,
          },
          {
            title: 'Chủ garage',
            render: (_, item) =>
              users?.find((user) => user.userID === item.userID)?.name,
          },
        ]}
        dataSource={data?.filter((item) =>
          item.garageName?.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
}

AdminManageGaragesPage.Layout = AdminLayout;
