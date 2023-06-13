import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type ForgotPasswordVariables = {
  body: {
    phoneNumber: string;
    verifyCode: string;
    newPassword: string;
  };
};

export const useForgotPasswordApi = (
  options?: BaseMutationApiOptions<unknown, ForgotPasswordVariables>
) => {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/User/forgot',
    ...options,
  });
};
