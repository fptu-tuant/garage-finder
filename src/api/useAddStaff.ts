import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddStaffVariables = {
  body: {
    employeeId: string;
    name: string;
    emailAddress: string;
    password: string;
    phoneNumber: string;
    gender: string;
    districtId: number;
    provinceId: 0;
    addressDetail: string;
    linkImage: string;
    garageID: number;
  };
};

export function useAddStaff(
  options?: BaseMutationApiOptions<string, AddStaffVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Staff/add',
    ...options,
  });
}
