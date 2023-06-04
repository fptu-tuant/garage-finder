import { Button, Input, Skeleton } from 'antd';

import { useGetGaragesApi } from '@/api';
import { GarageCard } from '@/components';

export default function GaragesPage() {
  const { data: garages, isLoading } = useGetGaragesApi();

  return (
    <Skeleton active loading={isLoading}>
      <div className="w-2/5 flex gap-2 mx-auto">
        <Input placeholder="Tìm kiếm ở đây ..." />
        <Button type="primary" className="min-w-[100px]">
          Tìm
        </Button>
      </div>

      <div className="flex gap-2 my-5">
        <div className="w-1/4">left</div>
        <div className="grow grid grid-cols-4 gap-x-6 gap-y-5">
          {garages?.map((garage) => (
            <GarageCard
              key={garage.garageID}
              image="https://picsum.photos/1600/900"
              title={garage.garageName}
              address={garage.address}
              totalRate={318}
              rating={4.8}
            />
          ))}
        </div>
      </div>
    </Skeleton>
  );
}
