import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type Variables = {
  params: {
    subscribeID: number;
    garageId: number;
  };
};

export const useAdminGetPaymentLink = (
  options?: BaseMutationApiOptions<string, Variables>
) => {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Subscription/getLinkPay',
    ...options,
  });
};
