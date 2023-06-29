import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type UseAddFavoriteGarageApi = BaseMutationApiOptions<string> & {
  garageId: number;
};

export function useAddFavoriteGarageApi({
  garageId,
  ...options
}: UseAddFavoriteGarageApi) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: `/api/FavoriteList/Add/${garageId}`,
    ...options,
  });
}
