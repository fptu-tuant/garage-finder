import { Layout, Radio, Skeleton, Typography } from 'antd';
import { useState } from 'react';

import { useGetMyOrder } from '@/api';
import { UserDashboardSider } from '@/components';
import GarageOrderCard from '@/components/GarageOrderCard/GarageOrderCard';

const { Sider, Content } = Layout;

export default function MyOrderPage() {
  const { data, isLoading, refetch } = useGetMyOrder();

  const [status, setStatus] = useState('all');

  const filteredData = data
    ?.filter((item) => (status === 'all' ? true : item.status === status))
    ?.filter((item) => item.status !== 'done');

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10">
        <Typography.Title level={2} className="mt-0 pt-0 font-bold">
          Quản lý lịch đặt
        </Typography.Title>

        <div className="mb-10 flex justify-end">
          <Radio.Group
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <Radio.Button value="all">Tất cả</Radio.Button>
            <Radio.Button value="open" className="text-orange-500">
              Chờ xác nhận
            </Radio.Button>
            <Radio.Button value="confirmed" className="text-green-500">
              Đã xác nhận
            </Radio.Button>
            <Radio.Button value="reject" className="text-red-500">
              Đã từ chối
            </Radio.Button>
            <Radio.Button value="canceled" className="text-gray-500">
              Đã hủy
            </Radio.Button>
            {/* <Radio.Button value="done" className="text-cyan-500">
            Đã hoàn thành
          </Radio.Button> */}
          </Radio.Group>
        </div>

        <Skeleton active loading={isLoading}>
          <div>
            {filteredData?.map((item) => (
              <GarageOrderCard
                id={item.gfOrderID}
                garageId={item.garageID}
                key={item.orderID}
                name={'ggarage name'}
                address={'garage address'}
                carBrand={item.brand}
                carType={item.typeCar}
                carLicensePlates={item.licensePlates}
                category={item.category}
                phone={'garage phone'}
                time={item.timeAppointment}
                status={item.status}
                onMutated={refetch}
                orderDetail={item}
              />
            ))}
          </div>
        </Skeleton>
      </Content>
    </Layout>
  );
}
