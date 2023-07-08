import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useCancelOrderByUser(
  options?: BaseMutationApiOptions<string, { id: number }>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/UserCancelOrder',
    ...options,
  });
}
