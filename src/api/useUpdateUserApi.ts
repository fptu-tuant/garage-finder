import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UpdateUserVariables = {
  body: {
    name: string;
    phoneNumber: string;
    emailAddress: string;
    linkImage: string;
    provinceId: number;
    districtId: number;
    addressDetail: string;
  };
};

export function useUpdateUserApi(
  options?: BaseMutationApiOptions<unknown, UpdateUserVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/User/update',
    ...options,
  });
}
