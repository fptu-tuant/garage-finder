import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Checkbox, Form, Input, Skeleton, Typography } from 'antd';
import { toLower } from 'lodash-es';

import { useGetGaragesApi } from '@/api';
import { GarageCard } from '@/components';
import { VIETNAM_PROVINCES } from '@/constants';

const VerticalCheckboxGroup = styled(Checkbox.Group)`
  display: block;
  max-height: 300px;
  overflow-y: auto;

  label {
    display: flex !important;
    margin-bottom: 0.4em;
  }
`;

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
        <div className="w-1/4">
          <Form preserve onValuesChange={(_, all) => console.log(all)}>
            <Typography.Text className="uppercase text-xs tracking-wider text-gray-500 font-semibold">
              Địa điểm
            </Typography.Text>
            <Form.Item name="searchPlace" noStyle>
              <Input
                className="mt-4 mb-2"
                placeholder="Search..."
                suffix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item dependencies={['searchPlace']}>
              {({ getFieldValue }) => {
                const keyword: string = toLower(getFieldValue('searchPlace'));

                return (
                  <Form.Item name="place">
                    <VerticalCheckboxGroup
                      options={
                        keyword
                          ? provineOptions.filter(({ label }) =>
                              toLower(label).includes(keyword)
                            )
                          : provineOptions
                      }
                      className="trungluc"
                    />
                  </Form.Item>
                );
              }}
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
