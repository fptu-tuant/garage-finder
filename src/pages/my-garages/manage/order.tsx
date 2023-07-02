import { Radio, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useGetGarageByIdApi, useGetOrderByGarageId } from '@/api';
import { ManageGarageLayout } from '@/layouts';

export default function ManageGarageOrderPage() {
  const { query } = useRouter();

  const [status, setStatus] = useState('all');

  const { data, isLoading } = useGetOrderByGarageId(Number(query?.garageId));

  console.log(data);

  return (
    <div>
      <Typography.Title level={3}>Quản lý lịch đặt</Typography.Title>
      <div className="flex justify-end">
        <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
          <Radio.Button value="all">Tất cả</Radio.Button>
          <Radio.Button value="waitConfirm">Chờ xác nhận</Radio.Button>
          <Radio.Button value="confirmed">Đã xác nhận</Radio.Button>
          <Radio.Button value="cancelled">Đã từ chối</Radio.Button>
          <Radio.Button>Đã hủy</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}

ManageGarageOrderPage.Layout = ManageGarageLayout;
