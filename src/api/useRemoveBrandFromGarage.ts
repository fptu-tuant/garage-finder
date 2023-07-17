import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useRemoveBrandFromGarage(
  options?: BaseMutationApiOptions<string>
) {
  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: '/api/Garage/removeBrand',
    ...options,
  });
}
