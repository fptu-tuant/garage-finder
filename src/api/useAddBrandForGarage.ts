import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddBrandForGarageVariables = {
  body: Array<{
    // brID: number;
    brandID: number;
    garageID: number;
  }>;
};

export function useAddBrandForGarage(
  options?: BaseMutationApiOptions<string, AddBrandForGarageVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Garage/addBrand',
    ...options,
  });
}
