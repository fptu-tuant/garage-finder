import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export type LoginResponseData = {
  userID: number;
  name: string;
  birthday: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  roleID: number;
  roleName: {
    roleID: number;
    nameRole: string;
  };
  accessToken: string;
};

type LoginVariables = {
  body: {
    email: string;
    password: string;
  };
};

export function useLoginApi(
  options?: BaseMutationApiOptions<LoginResponseData, LoginVariables>
) {
  return useBaseMutationApi({
    endpoint: '/api/User/login',
    method: 'POST',
    mutationKey: ['login'],
    ...options,
  });
}
