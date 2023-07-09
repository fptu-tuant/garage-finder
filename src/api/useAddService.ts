import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type Variables = {
  body: {
    nameService: string;
    categoryGarageID: number;
    cost: string;
    note: string;
  };
};

export function useAddService(
  options?: BaseMutationApiOptions<string, Variables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Service/Add',
    ...options,
  });
}
