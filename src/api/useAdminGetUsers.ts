import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type User = {
  userID: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  provinceId: number;
  districtId: number;
  addressDetail: string;
  haveGarage: boolean;
  status: null;
};

export function useAdminGetUsers(options?: BaseQueryApiOptions<User[]>) {
  return useBaseQueryApi({
    method: 'POST',
    endpoint: '/api/Admin/GetUsers',
    ...options,
  });
}
