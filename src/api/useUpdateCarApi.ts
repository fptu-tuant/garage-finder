import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UpdateCarVariables = {
  body: {
    carID: number;
    licensePlates: string;
    brandID: number;
    color: string;
    typeCar: string;
    avatar: string;
  };
};

export function useUpdateCarApi(
  options?: BaseMutationApiOptions<string, UpdateCarVariables>
) {
  return useBaseMutationApi({
    method: 'PUT',
    endpoint: '/api/Car/Update',
    ...options,
  });
}
