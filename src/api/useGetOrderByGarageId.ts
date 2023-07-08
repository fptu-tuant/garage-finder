import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

export type GetOrderGarageData = Array<{
  orderID: number;
  gfOrderID: number;
  garageID: number;
  category: string[];
  timeCreate: string;
  timeUpdate: string;
  timeAppointment: string;
  status: string;
  content: null;
  phoneNumber: string;
  email: string;
  brand: string;
  typeCar: string;
  licensePlates: string;
  color: string;
  name: string;
  imageOrders: [];
  fileOrders: [];
}>;

export function useGetOrderByGarageId(
  garageId: number,
  options?: BaseQueryApiOptions<GetOrderGarageData>
) {
  return useBaseQueryApi({
    endpoint: `/GetOrderByGarageId/${garageId}`,
    enabled: !isNaN(garageId),
    ...options,
  });
}
