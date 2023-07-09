import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetServices({
  id,
  ...options
}: BaseQueryApiOptions<
  Array<{
    serviceID: number;
    nameService: string;
    categoryGarageID: number;
    cost: string;
    note: string;
  }>
> & { id: number }) {
  return useBaseQueryApi({
    endpoint: `/api/Service/GetByCategory/${id}`,
    ...options,
  });
}
