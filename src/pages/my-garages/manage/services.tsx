import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAddCategoryForGarge, useGetGarageByIdApi } from '@/api';
import { ServicesSelect } from '@/components';
import { ManageGarageLayout } from '@/layouts';
import { showSuccess } from '@/utils';

function AddCategoryModal({
  garageId,
  ...rest
}: ModalProps & { garageId: number }) {
  const [category, setCategory] = useState<number[]>([]);

  const { mutateAsync: addCategory, isLoading } = useAddCategoryForGarge({
    onSuccess: () => showSuccess('Thêm hạng mục thành công!'),
  });

  return (
    <Modal
      {...rest}
      okText="Thêm"
      cancelButtonProps={{ className: 'invisible' }}
      okButtonProps={{ loading: isLoading, disabled: isEmpty(category) }}
      onOk={async (e) => {
        await addCategory({
          body: category.map((id) => ({ categoryID: id, garageID: garageId })),
        });

        rest.onCancel?.(e);
        rest.onOk?.(e);
      }}
    >
      <h2>Thêm hạng mục</h2>
      <ServicesSelect
        className="w-full"
        onChange={setCategory}
        value={category}
      />
    </Modal>
  );
}

export default function ManageGarageServicePage() {
  const { query } = useRouter();

  const {
    data: garage,
    isLoading: fetchingGarage,
    refetch,
  } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(query?.garageId)) },
    { id: Number(query?.garageId) }
  );

  const [showAddModal, setShowAddModal] = useState(false);

  const columns: ColumnsType<{
    categoryID: number;
    categoryName: string;
  }> = [
    { title: 'ID', render: (_, item) => item.categoryID },
    { title: 'Hạng mục', render: (_, item) => item.categoryName },

    {
      title: 'Hành động',
      render: (_, item) => (
        <div className="flex gap-4">
          <Button className="bg-green-500 hover:bg-green-500/70 border-none text-white rounded-full">
            Chi tiết
          </Button>
          <Button className="bg-red-500 hover:bg-red-500/70 border-none text-white rounded-full">
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>

        <div className="flex justify-end mb-10">
          <Button type="primary" onClick={() => setShowAddModal(true)}>
            Thêm hạng mục <PlusOutlined />{' '}
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={garage?.categoryGarages}
          loading={fetchingGarage}
        />
      </div>

      <AddCategoryModal
        garageId={garage?.garageID || 0}
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={() => refetch()}
      />
    </>
  );
}

ManageGarageServicePage.Layout = ManageGarageLayout;
