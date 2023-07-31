import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GarageInfo = {
  garageID: number;
  garageName: string;
  addressDetail: string;
  provinceID: number;
  districtsID: number;
  emailAddress: string;
  phoneNumber: string;
  status: null;
  openTime: string;
  closeTime: string;
  thumbnail: string;
  latAddress: null;
  lngAddress: null;
  userID: number;
  star: number;
  feedbacksNumber: number;
  categoryGarages: Array<{
    categoryGarageID: number;
    garageID: number;
    categoryID: number;
    categoryName: null;
    services: Array<{
      serviceID: number;
      nameService: string;
      categoryGarageID: number;
      note: null;
      cost: string;
      categoryGarage: null;
    }>;
  }>;
  garageBrands: Array<{
    brID: number;
    brandID: number;
    garageID: number;
  }>;
  imageGarages: Array<{
    imageID: number;
    garageID: number;
    imageLink: string;
  }>;
};

export function useAdminGetGarages(
  options?: BaseQueryApiOptions<GarageInfo[]>
) {
  return useBaseQueryApi({
    method: 'POST',
    endpoint: '/api/Admin/GetGarages',

    ...options,
  });
}
