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
        <div>
          <Button
            type="text"
            icon={<DeleteFilled />}
            className="text-red-500"
            onClick={() => {
              mutate({ id: garage.garageID });
            }}
          />
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
