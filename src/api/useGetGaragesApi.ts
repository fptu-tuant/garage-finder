import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetGaragesData = Array<{
  garageID: number;
  userID: number;
  garageName: string;
  emailAddress: string;
  phoneNumber: string;
  imageGarages: Array<{ imageID: number; garageID: number; imageLink: string }>;
  langAddress: number;
  latAddress: number;
  addressDetail: string;
  // TODO: get correct schema from BE side
  //   status: null;
  //   openTime: null;
  //   closeTime: null;
  //   logo: null;
}>;

export function useGetGaragesApi(
  options?: BaseQueryApiOptions<GetGaragesData>
) {
  return useBaseQueryApi({
    queryKey: 'garages',
    endpoint: '/api/Garage/GetAll',
    ...options,
  });
}
