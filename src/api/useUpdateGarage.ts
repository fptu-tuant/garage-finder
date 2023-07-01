import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UpdateGarageVariables = {
  body: {
    garageID: number;
    garageName: string;
    addressDetail: string;
    provinceID: number;
    districtsID: number;
    emailAddress: string;
    phoneNumber: string;
    status: string;
    openTime: string;
    closeTime: string;
    thumbnail: string;
    latAddress: number;
    lngAddress: number;
  };
};

export function useUpdateGarage(
  options?: BaseMutationApiOptions<string, UpdateGarageVariables>
) {
  return useBaseMutationApi({
    method: 'PUT',
    endpoint: '/api/Garage/Update',
    ...options,
  });
}
