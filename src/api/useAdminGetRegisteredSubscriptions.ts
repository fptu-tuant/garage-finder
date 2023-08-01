import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Subscription = {
  subscribeID: number;
  name: string;
  content: string;
  price: number;
  period: number;
  status: number;
};

export function useAdminGetRegisteredSubscriptions(
  options?: BaseQueryApiOptions<Subscription[]>
) {
  return useBaseQueryApi({
    endpoint: '/api/Subscription/getAll',
    ...options,
  });
}
