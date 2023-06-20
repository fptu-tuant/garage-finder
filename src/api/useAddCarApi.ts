import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddCarVariables = {
  body: {
    licensePlates: string;
    brandID: number;
    color: string;
    typeCar: string;
    avatar: string;
  };
};

export function useAddCarApi(
  options?: BaseMutationApiOptions<string, AddCarVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Car/Add',
    ...options,
  });
}
