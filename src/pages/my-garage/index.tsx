import { Empty } from 'antd';

import { useGetMyGarageApi } from '@/api';

export default function MyGaragePage() {
  const { data } = useGetMyGarageApi();

  const hasGarage = !!data?.length;

  return <div>{hasGarage ? 'cos garage' : <Empty />}</div>;
}
