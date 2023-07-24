import { BaseQueryApiOptions, Maybe } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

export type GetCarCompaniesData = Array<{
  brandID: number;
  brandName: string;
  note: Maybe<string>;
  imageLink: string;
}>;

export function useGetCarCompaniesApi(
  options?: BaseQueryApiOptions<GetCarCompaniesData>
) {
  return useBaseQueryApi({
    queryKey: 'car-companies',
    endpoint: '/api/Brand/GetAll',
    ...options,
  });
}
