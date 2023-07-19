import { Button, Table, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetGarageByIdApi, useRemoveBrandFromGarage } from '@/api';
import { ManageGarageLayout } from '@/layouts';

export default function GarageManageBrandPage() {
  const { query } = useRouter();

  const garageId = Number(query?.garageId);

  const {
    data: garage,
    isLoading: fetchingGarage,
    refetch,
  } = useGetGarageByIdApi({ enabled: !isNaN(garageId) }, { id: garageId });

  const { mutateAsync: removeBrand, isLoading: deleting } =
    useRemoveBrandFromGarage();

  return (
    <div>
      <Typography.Title level={3}>Quản lý hãng xe</Typography.Title>

      <div>
        <Button type="primary">Thêm</Button>
      </div>

      <div>
        <Table
          loading={fetchingGarage || deleting}
          columns={[
            {
              title: 'STT',
              render: (_, _2, idx) => idx + 1,
            },
            {
              title: 'Hãng xe',
              dataIndex: 'brandName',
            },
            {
              title: 'Hành động',
              render: (_, item) => (
                <div>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => {
                      removeBrand({ id: item.brId });
                      refetch();
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              ),
            },
          ]}
          dataSource={garage?.garageBrands}
        />
      </div>
    </div>
  );
}

GarageManageBrandPage.Layout = ManageGarageLayout;
