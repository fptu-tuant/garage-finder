import { Skeleton, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';

import { useAdminGetRegisteredSubscriptions } from '@/api/useAdminGetRegisteredSubscriptions';
import { ManageGarageLayout } from '@/layouts';

export default function ManageGarageTransactionPage() {
  const { query } = useRouter();
  const { garageId = '' } = query as { garageId: string };

  const { data, isLoading } = useAdminGetRegisteredSubscriptions({
    garageId: +garageId,
    enabled: !isEmpty(garageId),
  });

  return (
    <div>
      <Typography.Title level={3}>Giao dịch</Typography.Title>

      <Skeleton active loading={isLoading}>
        <Table
          columns={[
            { title: 'Tên gói', render: (_, item) => item.name },
            { title: 'Thời hạn', render: (_, item) => item.period },
            {
              title: 'Giá',
              render: (_, item) =>
                Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(item.price),
            },
            {
              title: 'Ngày mua',
              render: (_, item) => dayjs(item.dateCreate).format('DD-MM-YYYY'),
            },
            {
              title: 'Ngày hết hạn',
              render: (_, item) =>
                dayjs(item.expirationDate).format('DD-MM-YYYY'),
            },
            { title: 'Trạng thái', render: (_, item) => 'API chưa có' },
          ]}
          dataSource={data}
        />
      </Skeleton>
    </div>
  );
}

ManageGarageTransactionPage.Layout = ManageGarageLayout;
