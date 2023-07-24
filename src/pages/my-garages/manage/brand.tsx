import { Button, Form, Modal, Table, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
  useAddBrandForGarage,
  useGetGarageByIdApi,
  useRemoveBrandFromGarage,
} from '@/api';
import { CarBrandSelect } from '@/components';
import { ManageGarageLayout } from '@/layouts';

type ModalContentProps = {
  garageId: number;
  onClose?: () => void;
  garageBrands?:
    | {
        brId: number;
        brandName: string;
        linkImage: string;
      }[]
    | undefined;
};

function ModalContent({ onClose, garageId, garageBrands }: ModalContentProps) {
  const { mutateAsync: addBrand, isLoading } = useAddBrandForGarage();

  return (
    <Form
      onFinish={async (values) => {
        await addBrand({
          body: (values?.brands ?? []).map((brandId: string) => ({
            brandId,
            garageId,
          })),
        });

        onClose?.();
      }}
    >
      <Typography.Title>Thêm hãng xe</Typography.Title>

      <Form.Item name="brands">
        <CarBrandSelect
          transformOptions={(brands) =>
            (brands ?? []).filter(
              (brand) =>
                !garageBrands
                  ?.map((item) => item.brandName)
                  .includes(brand.brandName)
            )
          }
        />
      </Form.Item>

      <div className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Thêm
        </Button>
      </div>
    </Form>
  );
}

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

  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Typography.Title level={3}>Quản lý hãng xe</Typography.Title>

        <div className="flex justify-end">
          <Button type="primary" onClick={() => setOpen(true)}>
            Thêm
          </Button>
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
                      onClick={async () => {
                        await removeBrand({ id: item.brId });
                        await refetch();
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

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <ModalContent
          onClose={() => {
            setOpen(false);
            refetch();
          }}
          garageId={garageId}
          garageBrands={garage?.garageBrands}
        />
      </Modal>
    </>
  );
}

GarageManageBrandPage.Layout = ManageGarageLayout;
