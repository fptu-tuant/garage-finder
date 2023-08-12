import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetTotalIncome(options?: BaseQueryApiOptions<number>) {
  return useBaseQueryApi({
    endpoint: '/api/Subscription/GetIncome',
    ...options,
  });
}

type Invoice = {
  invoicesID: number;
  name: string;
  garageID: number;
  garageName: string;
  garagePhone: string;
  garageEmail: string;
  garageAddress: string;
  subscribeID: number;
  status: string;
};

export function useGetInvoices(options?: BaseQueryApiOptions<Invoice[]>) {
  return useBaseQueryApi({
    endpoint: '/api/Subscription/GetAllInvoice',
    ...options,
  });
}
