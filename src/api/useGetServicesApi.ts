import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetServicesData = Array<{
  categoryID: number;
  categoryName: string;
}>;

export function useGetServicesApi(
  options?: BaseQueryApiOptions<GetServicesData>
) {
  return useBaseQueryApi({
    queryKey: 'services',
    endpoint: '/api/Category/GetAll',
    ...options,
  });
}
