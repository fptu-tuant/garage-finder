import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetRagaresData = Array<{
  garageID: number;
  userID: number;
  garageName: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  // TODO: get correct schema from BE side
  //   status: null;
  //   openTime: null;
  //   closeTime: null;
  //   logo: null;
  //   imagies: null;
  //   latAddress: null;
  //   lngAddress: null;
}>;

export function useGetGaragesApi(
  options?: BaseQueryApiOptions<GetRagaresData>
) {
  return useBaseQueryApi({
    endpoint: '/api/Garage/GetAll',
    ...options,
  });
}
