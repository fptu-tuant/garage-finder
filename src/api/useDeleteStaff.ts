import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export default function useDeleteStaff(
  options?: BaseMutationApiOptions<string>
) {
  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: '/api/Staff/delete',
    ...options,
  });
}
