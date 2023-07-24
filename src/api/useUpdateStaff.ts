import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UpdateStaffVariables = {
  body: {
    staffId: number;
    employeeId: string;
    name: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    gender: string;
    districtId: number;
    provinceId: number;
    addressDetail: string;
    linkImage: string;
  };
};

export function useUpdateStaff(
  options?: BaseMutationApiOptions<string, UpdateStaffVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Staff/update',
    ...options,
  });
}
