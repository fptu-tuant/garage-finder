import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Skeleton, Table, TableProps } from 'antd';
import { useRouter } from 'next/router';

import { GetMyGarageData, useDeleteGarageApi, useGetMyGarageApi } from '@/api';

export default function MyGaragePage() {
  const { data, isLoading, refetch } = useGetMyGarageApi();

  const router = useRouter();

  const { mutate } = useDeleteGarageApi({
    onSuccess: () => refetch(),
  });

  const hasGarage = !!data?.length;

  const columns: TableProps<GetMyGarageData[number]>['columns'] = [
    { title: 'ID', dataIndex: 'garageID' },
    { title: 'Tên Garage', dataIndex: 'garageName' },
    { title: 'Địa chỉ', dataIndex: 'addressDetail' },
    {
      title: 'Hành động',
      render: (garage: GetMyGarageData[number]) => (
        <div className="flex gap-4">
          <Button
            className="text-white bg-green-500 border-none hover:bg-green-500/50"
            onClick={() => {
              router.push(
                `/my-garages/manage/info?garageId=${garage.garageID}`
              );
            }}
          >
            Quản lý garage
          </Button>
          <Button
            icon={<DeleteFilled />}
            className="text-white bg-red-500 border-none hover:bg-red-500/50"
            onClick={() => {
              mutate({ id: garage.garageID });
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Skeleton active loading={isLoading}>
      <Button
        type="primary"
        className="mb-3"
        onClick={() => router.push('my-garages/add')}
      >
        <PlusOutlined />
        Thêm garage
      </Button>

      {!hasGarage && <Empty />}

      {hasGarage && <Table columns={columns} dataSource={data} />}
    </Skeleton>
  );
}
