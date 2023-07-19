import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddBrandVariables = {
  body: {
    brandID: number;
    brandName: string;
    note: string;
    imageLink: string;
  };
};

export function useAddBrand(
  options?: BaseMutationApiOptions<string, AddBrandVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: 'api/Brand/Add',
    ...options,
  });
}
