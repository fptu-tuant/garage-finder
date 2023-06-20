import { BaseQueryApiOptions, Maybe } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetFavoriteGaragesData = Array<{
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

export function useGetFavoriteGarageApi(
  options?: BaseQueryApiOptions<GetFavoriteGaragesData>
) {
  return useBaseQueryApi({
    queryKey: 'getFavorite',
    endpoint: '/api/FavoriteList/GetByUser',
    ...options,
  });
}
