import { BaseQueryApiOptions, Maybe } from '@/types';

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
  thumbnail: Maybe<string>;
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
