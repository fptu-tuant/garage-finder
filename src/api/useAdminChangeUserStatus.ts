import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useAdminChangeUserStatus(
  options?: BaseMutationApiOptions<
    string,
    { body: { userId: number; status: string } }
  >
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Admin/SetStatusUser',
    ...options,
  });
}
