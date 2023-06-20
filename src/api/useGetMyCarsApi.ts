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

export function useGetMyCarsApi() {
  return useBaseQueryApi<GetMyCarsData>({
    queryKey: 'getCars',
    endpoint: '/api/Car/GetByUser',
  });
}
