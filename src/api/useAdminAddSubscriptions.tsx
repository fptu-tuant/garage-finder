import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddSubscriptionVariables = {
  body: {
    name: string;
    content: string;
    price: number;
    period: number;
  };
};

export function useAdminAddSubscription(
  options?: BaseMutationApiOptions<string, AddSubscriptionVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Subscription/add',
    ...options,
  });
}
