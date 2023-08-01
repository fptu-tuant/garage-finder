import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddSubscriptionVariables = {
  body: {
    subscribeID: number;
    name: string;
    content: string;
    price: number;
    period: number;
    status: number;
  };
};

export function useAdminUpdateSubscription(
  options?: BaseMutationApiOptions<string, AddSubscriptionVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Subscription/add',
    ...options,
  });
}
