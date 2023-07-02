import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddOrderFromGuestVariables = {
  body: {
    garageId: number;
    name: string;
    email: string;
    phoneNumber: string;
    verificationCode: string;
    brandCarID: number;
    typeCar: string;
    licensePlates: string;
    categoryGargeId: number[];
    timeAppointment: string;
  };
};

export function useAddOrderFromGuest(
  options?: BaseMutationApiOptions<string, AddOrderFromGuestVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/AddOrderFromGuest',
    ...options,
  });
}
