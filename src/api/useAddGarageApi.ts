import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddGarageData = 'SUCCESS' | 'FAILED';

type AddGarageVariables = {
  body: {
    garageName?: string;
    addressDetail?: string;
    provinceID?: number;
    districtsID?: number;
    emailAddress?: string;
    phoneNumber?: string;
    status?: string;
    openTime?: string;
    closeTime?: string;
    thumbnail?: string;
    imagies?: string;
    latAddress?: number;
    lngAddress?: number;
    categoriesID?: number[];
    brandsID?: number[];
    imageLink?: string[];
  };
};

export const useAddGarageApi = (
  options?: BaseMutationApiOptions<AddGarageData, AddGarageVariables>
) => {
  return useBaseMutationApi({
    endpoint: '/api/Garage/Add',
    method: 'POST',
    mutationKey: ['login'],
    ...options,
  });
};
