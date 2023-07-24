import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useUpdateMyStaffInfo(options?: BaseMutationApiOptions<string>) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Staff/update',
    ...options,
  });
}
