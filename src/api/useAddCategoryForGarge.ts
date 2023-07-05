import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type Variables = {
  body: Array<{
    garageID: number;
    categoryID: number;
  }>;
};

export function useAddCategoryForGarge(
  options?: BaseMutationApiOptions<string, Variables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Garage/addCategoryForGarage',
    ...options,
  });
}
