import { Affix, Button, Form, Input, Skeleton, Typography } from 'antd';

import { useGetGaragesApi } from '@/api';
import { CheckboxGroup, GarageCard } from '@/components';
import { VIETNAM_PROVINCES } from '@/constants';

export default function GaragesPage() {
  const { data: garages, isLoading } = useGetGaragesApi();

  const provineOptions = VIETNAM_PROVINCES.map((provine) => ({
    label: provine.name,
    value: provine.code,
  }));

  return (
    <Skeleton active loading={isLoading}>
      <div className="w-2/5 flex gap-2 mx-auto">
        <Input placeholder="Tìm kiếm ở đây ..." />
        <Button type="primary" className="min-w-[100px]">
          Tìm
        </Button>
      </div>

      <div className="flex gap-6 my-5">
        <div className="w-1/4 bg-white">
          <Form preserve onValuesChange={(_, all) => console.log(all)}>
            <Typography.Text className="uppercase text-xs tracking-wider text-gray-500 font-semibold">
              Địa điểm
            </Typography.Text>
            <Form.Item name="place">
              <CheckboxGroup options={provineOptions} />
            </Form.Item>
          </Form>
        </div>
        <div className="grow grid grid-cols-3 gap-x-6 gap-y-5">
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
