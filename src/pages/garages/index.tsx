import { Button, Form, Input, Skeleton, Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';

import {
  useGetCarCompaniesApi,
  useGetGaragesApi,
  useGetServicesApi,
} from '@/api';
import { CheckboxGroup, GarageCard } from '@/components';
import { VIETNAM_PROVINCES } from '@/constants';

type GarageFilterFormProps = {
  places: CheckboxValueType[];
  services: CheckboxValueType[];
};

export default function GaragesPage() {
  const [form] = Form.useForm<GarageFilterFormProps>();

  const [keyword, setKeyword] = useState('');

  const { data: garages, isLoading: fetchingGarages } = useGetGaragesApi();

  const { data: servicesResponseData, isLoading: fetchingServices } =
    useGetServicesApi();

  const { data: carBrands, isLoading: fetchingCarBrands } =
    useGetCarCompaniesApi();

  const provineOptions = VIETNAM_PROVINCES.map((provine) => ({
    label: provine.name,
    value: provine.code,
  }));

  const servicesOptions = servicesResponseData?.map((service) => ({
    label: service.categoryName,
    value: service.categoryID,
  }));

  const carBrandsOptions = carBrands?.map((brand) => ({
    label: brand.brandName,
    value: brand.brandID,
  }));

  const places = Form.useWatch(['places'], form);
  const services = Form.useWatch(['services'], form);
  const brands = Form.useWatch(['brands'], form);

  const displayGarages = garages?.filter((garage) =>
    garage.garageName.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
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
              Địa điểm{' '}
              <span className="text-red-600">({places?.length ?? 0})</span>
            </Typography>
            <Form.Item name="places">
              <CheckboxGroup options={provineOptions} />
            </Form.Item>

            <Typography className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">
              Loại dịch vụ{' '}
              <span className="text-red-600">({services?.length ?? 0})</span>
            </Typography>
            <Skeleton active loading={fetchingServices}>
              <Form.Item name="services">
                <CheckboxGroup showSearch={false} options={servicesOptions} />
              </Form.Item>
            </Skeleton>

            <Typography className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">
              Hãng xe{' '}
              <span className="text-red-600">({brands?.length ?? 0})</span>
            </Typography>
            <Skeleton active loading={fetchingCarBrands}>
              <Form.Item name="brands">
                <CheckboxGroup showSearch={false} options={carBrandsOptions} />
              </Form.Item>
            </Skeleton>
          </Form>
        </div>

        <Skeleton active loading={fetchingGarages}>
          <div className="grow grid grid-cols-3 gap-x-6 gap-y-8">
            {displayGarages?.map((garage) => (
              <GarageCard
                key={garage.garageID}
                id={garage.garageID}
                image={garage.thumbnail}
                title={garage.garageName}
                address={garage.addressDetail}
                totalRate={318}
                rating={4.8}
              />
            ))}
          </div>
        </Skeleton>
      </div>
    </>
  );
}
