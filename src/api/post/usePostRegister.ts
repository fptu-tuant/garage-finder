import { BaseApiCallProps, useBaseApi } from '../useBaseApi';

type RegisterDataResponse = null;

type RegisterVariables = {
  name: string;
  birthDay?: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  roleID: 0;
};

export function usePostRegister(
  props?: BaseApiCallProps<RegisterDataResponse, RegisterVariables>
) {
  return useBaseApi({ method: 'GET', url: '/register', ...props });
}
