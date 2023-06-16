import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetMeData = {
  userID: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  password: string | null;
  status: null;
  linkImage: string | null;
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
