import { Input, Table } from 'antd';
import { useState } from 'react';

import { useAdminGetUsers } from '@/api';
import { AdminLayout } from '@/layouts';

export default function AdminManageUsersPage() {
  const { data, isLoading } = useAdminGetUsers({ variables: { body: {} } });

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
        ]}
        dataSource={data?.filter((item) =>
          item.name?.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
}

AdminManageUsersPage.Layout = AdminLayout;
