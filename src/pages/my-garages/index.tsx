import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Skeleton, Table } from 'antd';
import { useRouter } from 'next/router';

import { useGetMyGarageApi } from '@/api';

const columns = [
  { title: 'ID', dataIndex: 'garageID' },
  { title: 'Tên Garage', dataIndex: 'garageName' },
  { title: 'Địa chỉ', dataIndex: 'addressDetail' },
];

export default function MyGaragePage() {
  const { data, isLoading } = useGetMyGarageApi();

  const router = useRouter();

  const hasGarage = !!data?.length;

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
