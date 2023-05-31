import { BaseApiCallProps, useBaseApi } from './useBaseApi';

type LoginByGoogleDataResponse = {
  userID: number;
  name: string;
  birthday: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  roleID: number;
  roleName: {
    roleID: number;
    nameRole: string;
  };
  accessToken: string;
};

type LoginByGoogleBody = {
  accessToken: string;
};

export function useLoginByGoogleApi(
  props?: BaseApiCallProps<LoginByGoogleDataResponse, LoginByGoogleBody>
) {
  return useBaseApi({ method: 'POST', url: '/api/User/login-gg', ...props });
}
