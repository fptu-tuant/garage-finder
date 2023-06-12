import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type CarOwnerSignUpData = string;

type CarOwnerSignUpVariables = {
  body: {
    name: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    roleID: 0;
  };
};

export function useCarOwnerRegisterApi(
  options?: BaseMutationApiOptions<CarOwnerSignUpData, CarOwnerSignUpVariables>
) {
  return useBaseMutationApi({
    endpoint: 'api/User/register',
    method: 'POST',
    mutationKey: ['car-owner-sign-up'],
    ...options,
  });
}
