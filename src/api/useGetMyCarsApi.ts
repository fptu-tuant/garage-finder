import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetMyCarsData = Array<{
  carID: number;
  userID: number;
  licensePlates: string;
  brandID: number;
  color: string;
  typeCar: string;
  avatar: string;
}>;

export function useGetMyCarsApi(options?: BaseQueryApiOptions<GetMyCarsData>) {
  return useBaseQueryApi({
    queryKey: 'getCars',
    endpoint: '/api/Car/GetByUser',
    ...options,
  });
}
