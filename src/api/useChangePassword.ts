import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type ChangePasswordVariables = {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

export function useChangePassword(
  options?: BaseMutationApiOptions<string, ChangePasswordVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/User/changePassword',
    ...options,
  });
}
