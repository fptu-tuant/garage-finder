import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useDeleteService(options?: BaseMutationApiOptions<string>) {
  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: '/api/Service/Delete',
    ...options,
  });
}
