import { Button, Radio, Typography } from 'antd';
import { useState } from 'react';

import { ManageGarageLayout } from '@/layouts';

export default function ManageGarageOrderPage() {
  const [status, setStatus] = useState('all');

  return (
    <div>
      <Typography.Title level={3}>Quản lý lịch đặt</Typography.Title>
      <div className="flex justify-end">
        <Radio.Group>
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
