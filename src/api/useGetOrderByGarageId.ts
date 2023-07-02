import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetOrderByGarageId(garageId: number) {
  return useBaseQueryApi({
    endpoint: `/GetOrderByGarageId/${garageId}`,
  });
}
