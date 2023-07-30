import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export type StaffLoginData = {
  userID: number;
  name: string;
  employeeId: string;
  phoneNumber: string;
  linkImage: null | string;
  addressDetail: string;
  districtId: number;
  provinceId: number;
  status: null;
  emailAddress: string;
  accessToken: string;
  garageID: number;
  refreshToken: {
    tokenID: number;
    staffId: number;
    token: string;
    expiresDate: string;
    createDate: string;
    staff: null;
  };
};

export function useStaffLogin(
  options?: BaseMutationApiOptions<StaffLoginData>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Staff/login',
    ...options,
  });
}
