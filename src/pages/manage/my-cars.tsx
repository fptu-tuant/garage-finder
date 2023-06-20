import { PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Skeleton, Typography } from 'antd';
import { useState } from 'react';

import { useGetMyCarsApi } from '@/api/useGetMyCarsApi';
import { CarManageForm, UserDashboardSider } from '@/components';

const { Sider, Content } = Layout;

export default function MyCarsPage() {
  const { data: cars, isLoading: fetchingCars, refetch } = useGetMyCarsApi();

  const [isAddingNewCar, setAddingNewCar] = useState(false);

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10" key={cars?.length}>
        <div className="flex gap-2">
          <Typography.Title level={2} className="mt-0 pt-0 font-bold">
            Xe của tôi
          </Typography.Title>
        </div>
        <p className="mb-20">Thêm xe trước khi thực hiện đặt lịch</p>

        <Skeleton active loading={fetchingCars}>
          <div className="flex flex-col gap-10">
            {(cars ?? []).map((car) => (
              <CarManageForm
                key={car.carID}
                formValues={car}
                onFinishCallApi={() => {
                  setAddingNewCar(false);
                  refetch();
                }}
              />
            ))}

            {isAddingNewCar ? (
              <CarManageForm
                onFinishCallApi={() => {
                  setAddingNewCar(false);
                  refetch();
                }}
              />
            ) : (
              <div className="text-center mt-10">
                <Button type="primary" onClick={() => setAddingNewCar(true)}>
                  <PlusOutlined />
                  <span>Thêm xe</span>
                </Button>
              </div>
            )}
          </div>
        </Skeleton>
      </Content>
    </Layout>
  );
}
