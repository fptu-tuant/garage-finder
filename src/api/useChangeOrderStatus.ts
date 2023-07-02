import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useChangeOrderStatus(options?: BaseMutationApiOptions<string>) {
  const approve = useBaseMutationApi({
    method: 'POST',
    endpoint: '/GarageAcceptOrder',
    ...options,
  });

  const reject = useBaseMutationApi({
    method: 'POST',
    endpoint: '/GarageRejectOrder',
    ...options,
  });

  return { approve, reject };
}
