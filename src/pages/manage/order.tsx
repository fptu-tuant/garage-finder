import { Layout, Skeleton, Typography } from 'antd';

import { useGetMyOrder } from '@/api';
import { UserDashboardSider } from '@/components';
import GarageOrderCard from '@/components/GarageOrderCard/GarageOrderCard';

const { Sider, Content } = Layout;

export default function MyOrderPage() {
  const { data, isLoading, refetch } = useGetMyOrder();

  console.log(data);

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10">
        <Typography.Title level={2} className="mt-0 pt-0 font-bold">
          Quản lý lịch đặt
        </Typography.Title>

        <Skeleton active loading={isLoading}>
          <div>
            {data?.map((item) => (
              <GarageOrderCard
                id={item.gfOrderID}
                key={item.orderID}
                name={'ggarage name'}
                address={'garage address'}
                carBrand={'my car brand'}
                category={item.category}
                phone={'garage phone'}
                time={'time order'}
                status={item.status}
                onMutated={refetch}
              />
            ))}
          </div>
        </Skeleton>
      </Content>
    </Layout>
  );
}
