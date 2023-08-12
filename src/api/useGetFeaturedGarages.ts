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
  feedbacksNumber: number;
  star: number;
}>;

export function useGetFeaturedGarages(
  options?: BaseQueryApiOptions<GetGaragesData>
) {
  return useBaseQueryApi({
    endpoint: '/api/Garage/getGarageSuggest',
    ...options,
  });
}
