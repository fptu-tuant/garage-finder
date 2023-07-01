import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetGarageData = {
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
  thumbnail: null;
  latAddress: number;
  lngAddress: number;
  categoryGarages: number[];
  garageBrands: number[];
  imageGarages: Array<{
    imageID: number;
    garageID: number;
    imageLink: string;
  }>;
};

type GetGarageContext = {
  id: number;
};

export function useGetGarageByIdApi(
  options?: BaseQueryApiOptions<GetGarageData>,
  context?: GetGarageContext
) {
  return useBaseQueryApi({
    queryKey: `garages-${context?.id}`,
    endpoint: `api/Garage/GetByID/${context?.id}`,
    ...options,
  });
}
