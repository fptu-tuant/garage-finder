import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetMeData = {
  userID: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  password: string | null;
  status: null;
  provinceId: number;
  districtId: number;
  linkImage: string | null;
  addressDetail: string;
  roleID: number;
  roleName: {
    roleID: number;
    nameRole: string;
  };
  accessToken: null | string;
};

export function useGetMe(options?: BaseQueryApiOptions<GetMeData>) {
  return useBaseQueryApi({
    endpoint: 'api/User/get',
    ...options,
  });
}
