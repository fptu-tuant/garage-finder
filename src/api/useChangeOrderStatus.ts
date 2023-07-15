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

  const done = useBaseMutationApi({
    method: 'POST',
    endpoint: '/GarageDoneOrder',
    ...(options as BaseMutationApiOptions<
      string,
      {
        body: {
          gfOrderId: number;
          content: string;
          imageLinks: string[];
          fileLinks: string[];
        };
      }
    >),
  });

  return { approve, reject, done };
}
