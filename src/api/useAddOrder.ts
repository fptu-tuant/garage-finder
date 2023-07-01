import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddOrderVariables = {
  body: {
    phoneNumber: string;
    verificationCode: string;
    carId: number;
    garageId: number;
    categorygarageId: number;
    timeAppointment: string;
  };
};

export function useAddOrder(
  options?: BaseMutationApiOptions<string, AddOrderVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/AddOrder',
    ...options,
  });
}
