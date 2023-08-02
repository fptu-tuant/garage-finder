import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Subscription = {
  subscribeID: number;
  name: string;
  content: string;
  price: number;
  period: number;
  status: number;
  dateCreate: string;
  expirationDate: string;
};

export function useAdminGetRegisteredSubscriptions({
  garageId,
  ...options
}: BaseQueryApiOptions<Subscription[]> & { garageId: number }) {
  return useBaseQueryApi({
    endpoint: `/api/Subscription/registeredSubscription/${garageId}`,
    ...options,
  });
}
