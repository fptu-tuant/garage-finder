import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetMyOrderData = Array<{
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
  brand: null;
  typeCar: string;
  licensePlates: string;
  color: string;
  name: string;
  imageOrders: [];
  fileOrders: [];
}>;

export function useGetMyOrder(options?: BaseQueryApiOptions<GetMyOrderData>) {
  return useBaseQueryApi({
    endpoint: '/GetByUser',
    ...options,
  });
}
