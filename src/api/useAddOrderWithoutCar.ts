import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddOrderWithoutCarVariables = {
  body: {
    garageId: number;
    name: string;
    phoneNumber: string;
    verificationCode: string;
    brandCarID: number;
    typeCar: string;
    licensePlates: string;
    categoryGargeId: number[];
    timeAppointment: string;
  };
};

export function useAddOrderWithoutCar(
  options?: BaseMutationApiOptions<string, AddOrderWithoutCarVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/AddOrderWithoutCar',
    ...options,
  });
}
