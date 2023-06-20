import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type SendVerifyCodeData = 'SUCCESS' | 'FAILED';

type SendVerifyCodeVariables = {
  body: string;
};

export const useSendVerifyCode = (
  options?: BaseMutationApiOptions<SendVerifyCodeData, SendVerifyCodeVariables>
) => {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: 'api/User/sendPhoneCode',
    headers: {
      'Content-Type': 'application/json',
    },
    mutationKey: ['send-verify-code'],
    ...options,
  });
};
