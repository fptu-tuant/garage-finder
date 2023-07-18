import { Layout, Skeleton, Typography } from 'antd';

import { useGetMyOrder } from '@/api';
import { UserDashboardSider } from '@/components';
import GarageOrderCard from '@/components/GarageOrderCard/GarageOrderCard';

const { Sider, Content } = Layout;

export default function MyHistoryPage() {
  const { data, isLoading, refetch } = useGetMyOrder();

  return (
    <>
      <Layout hasSider className="bg-transparent mt-20">
        <Sider className="text-center bg-transparent">
          <UserDashboardSider />
        </Sider>
        <Content className="flex flex-col pr-6 pl-10">
          <Typography.Title level={2} className="mt-0 pt-0 font-bold">
            Lịch sử sửa chữa
          </Typography.Title>

          <Skeleton active loading={isLoading}>
            <div>
              {data
                ?.filter((item) => item.status === 'done')
                ?.map((item) => (
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
    </>
  );
}
