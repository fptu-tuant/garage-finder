import { BaseApiCallProps, useBaseApi } from './useBaseApi';

type RegisterDataResponse = null;

type RegisterVariables = {
  name: string;
  birthDay?: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  roleID: 2 | 3;
};

export function useRegisterApi(
  props?: BaseApiCallProps<RegisterDataResponse, RegisterVariables>
) {
  return useBaseApi({ method: 'POST', url: '/api/User/register', ...props });
}
