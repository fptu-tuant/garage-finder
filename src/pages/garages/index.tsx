import { Button, Form, Input, Skeleton, Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';

import { useGetGaragesApi } from '@/api';
import { CheckboxGroup, GarageCard } from '@/components';
import { GARAGE_SERVICES, VIETNAM_PROVINCES } from '@/constants';

type GarageFilterFormProps = {
  places: CheckboxValueType[];
  services: CheckboxValueType[];
};

export default function GaragesPage() {
  const [form] = Form.useForm<GarageFilterFormProps>();

  const [keyword, setKeyword] = useState('');

  const { data: garages, isLoading } = useGetGaragesApi();

  const provineOptions = VIETNAM_PROVINCES.map((provine) => ({
    label: provine.name,
    value: provine.code,
  }));

  const places = Form.useWatch(['places'], form);
  const services = Form.useWatch(['services'], form);

  const displayGarages = garages?.filter((garage) =>
    garage.garageName.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Skeleton active loading={isLoading}>
      <div className="w-2/5 flex gap-2 mx-auto">
        <Input
          placeholder="Tìm kiếm ở đây ..."
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
        <Button type="primary" className="min-w-[100px">
          Tìm
        </Button>
      </div>

      <div className="flex gap-6 my-5">
        <div className="w-1/4 bg-white">
          <Form form={form} onValuesChange={(_, all) => console.log(all)}>
            <Typography className="uppercase text-xs tracking-wider text-gray-500 font-semibold">
              Địa điểm <span className="text-red-600">({places?.length})</span>
            </Typography>
            <Form.Item name="places">
              <CheckboxGroup options={provineOptions} />
            </Form.Item>

            <Typography className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">
              Loại dịch vụ{' '}
              <span className="text-red-600">({services?.length})</span>
            </Typography>
            <Form.Item name="services">
              <CheckboxGroup showSearch={false} options={GARAGE_SERVICES} />
            </Form.Item>
          </Form>
        </div>
        <div className="grow grid grid-cols-3 gap-x-6 gap-y-5">
          {displayGarages?.map((garage) => (
            <GarageCard
              key={garage.garageID}
              image={garage.imagies}
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
