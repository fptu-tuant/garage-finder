import { Button, Result, Skeleton, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';

import { useAdminGetRegisteredSubscriptions } from '@/api/useAdminGetRegisteredSubscriptions';
import { ManageGarageLayout } from '@/layouts';

export default function ManageGarageTransactionPage() {
  const { query, push } = useRouter();
  const { garageId = '', vnp_TransactionStatus } = query as {
    garageId: string;
    vnp_TransactionStatus: string;
  };

  const { data, isLoading } = useAdminGetRegisteredSubscriptions({
    garageId: +garageId,
    enabled: !isEmpty(garageId),
  });

  return (
    <div>
      <Typography.Title level={3}>Giao dịch</Typography.Title>

      <Skeleton active loading={isLoading}>
        {vnp_TransactionStatus ? (
          <Result
            status="success"
            title="Mua gói thành viên thành công"
            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  push({ query: { garageId } }, undefined, { shallow: true });
                }}
              >
                Về trang giao dịch
              </Button>,
              // <Button key="buy">Buy Again</Button>,
            ]}
          />
        ) : (
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
                render: (_, item) =>
                  dayjs(item.dateCreate).format('DD-MM-YYYY'),
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
        )}
      </Skeleton>
    </div>
  );
}

ManageGarageTransactionPage.Layout = ManageGarageLayout;
