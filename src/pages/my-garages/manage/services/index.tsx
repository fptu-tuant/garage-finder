import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  useAddCategoryForGarge,
  useDeleteCategory,
  useGetGarageByIdApi,
} from '@/api';
import { ServicesSelect } from '@/components';
import { ManageGarageLayout } from '@/layouts';
import { showSuccess } from '@/utils';

function AddCategoryModal({
  garageId,
  currentCategories,
  ...rest
}: ModalProps & { garageId: number; currentCategories: string[] }) {
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
      onCancel={(e) => {
        setCategory([]);
        rest.onCancel?.(e);
      }}
    >
      <h2>Thêm hạng mục</h2>
      <ServicesSelect
        className="w-full"
        onChange={setCategory}
        value={category}
        modifyOptions={(options) =>
          (options ?? []).filter(
            (item) => !currentCategories.includes(item.label as string)
          )
        }
      />
    </Modal>
  );
}

export default function ManageGarageServicePage() {
  const { query, push } = useRouter();

  const {
    data: garage,
    isLoading: fetchingGarage,
    refetch,
  } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(query?.garageId)) },
    { id: Number(query?.garageId) }
  );

  const [currentDeleteId, setCurrentDeleteId] = useState<number>();
  const { mutateAsync: deleteCategory, isLoading: deletingCategory } =
    useDeleteCategory({
      onSuccess: () => refetch(),
    });

  const [showAddModal, setShowAddModal] = useState(false);

  const columns: ColumnsType<{
    categoryID: number;
    categoryName: string;
    categoryGarageID: number;
  }> = [
    { title: 'ID', render: (_, item) => item.categoryID },
    { title: 'Hạng mục', render: (_, item) => item.categoryName },

    {
      title: 'Hành động',
      render: (_, item) => (
        <div className="flex gap-4">
          <Button
            className="bg-green-500 hover:bg-green-500/70 border-none text-white rounded-full"
            onClick={() =>
              push(
                `/my-garages/manage/services/detail?categoryId=${item.categoryGarageID}&garageId=${garage?.garageID}`
              )
            }
          >
            Chi tiết
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-500/70 border-none text-white rounded-full"
            onClick={async () => {
              setCurrentDeleteId(item.categoryGarageID);
              await deleteCategory({ id: item.categoryGarageID });
              setCurrentDeleteId(undefined);
            }}
            disabled={
              currentDeleteId === item.categoryGarageID && deletingCategory
            }
            loading={
              currentDeleteId === item.categoryGarageID && deletingCategory
            }
          >
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
        currentCategories={(garage?.categoryGarages || []).map(
          (item) => item.categoryName
        )}
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={() => refetch()}
      />
    </>
  );
}

ManageGarageServicePage.Layout = ManageGarageLayout;
