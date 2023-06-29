import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UseDeleteGarageApiProps = BaseMutationApiOptions<string>;

export function useDeleteGarageApi(options?: UseDeleteGarageApiProps) {
  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: '/api/Garage/Delete',
    ...options,
  });
}
