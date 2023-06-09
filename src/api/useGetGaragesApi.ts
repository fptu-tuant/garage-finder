import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetGaragesData = Array<{
  garageID: number;
  userID: number;
  garageName: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  imagies: string;
  langAddress: number;
  latAddress: number;
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
