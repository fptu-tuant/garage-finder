import { Table } from 'antd';

import { useGetInvoices } from '@/api';
import { AdminLayout } from '@/layouts';
import { getGarageDetailAddress } from '@/services';

export default function AdminManageSubscriptionsPage() {
  const { data: invoices, isLoading } = useGetInvoices();

  return (
    <div>
      <Table
        dataSource={invoices}
        columns={[
          {
            title: 'ID',
            render: (_, item) => item.invoicesID,
          },
          {
            title: 'Tên garage',
            render: (_, item) => item.garageName,
          },
          {
            title: 'Số điện thoại',
            render: (_, item) => item.garagePhone,
          },
          {
            title: 'Email garage',
            render: (_, item) => item.garageEmail,
          },
          {
            title: 'Địa chỉ',
            render: (_, item) => getGarageDetailAddress(item.garageAddress),
          },
          {
            title: 'Gói dịch vụ',
            render: (_, item) => item.name,
          },
          {
            title: 'Trạng thái',
            render: (_, item) => item.status,
          },
        ]}
      />
    </div>
  );
}

AdminManageSubscriptionsPage.Layout = AdminLayout;
