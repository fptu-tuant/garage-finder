import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';
type Variables = {
  body: {
    serviceID: number;
    nameService: string;
    categoryGarageID: number;
    cost: string;
    note: string;
  };
};

export function useUpdateService(
  options?: BaseMutationApiOptions<string, Variables>
) {
  return useBaseMutationApi({
    method: 'PUT',
    endpoint: '/api/Service/Update',
    ...options,
  });
}
