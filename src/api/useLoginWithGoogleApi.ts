import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export type LoginByGoogleData = {
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

type LoginByGoogleDataVariables = {
  params: { accessToken: string };
};

export function useLoginWithGoogleApi(
  options?: BaseMutationApiOptions<
    LoginByGoogleData,
    LoginByGoogleDataVariables
  >
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/User/login-gg',
    mutationKey: ['login-with-google'],
    ...options,
  });
}
