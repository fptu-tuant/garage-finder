import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddFavoriteGarageVariables = {
  body: {
    garageID: number;
  };
};

export function useAddFavoriteGarageApi(
  options?: BaseMutationApiOptions<string, AddFavoriteGarageVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/FavoriteList/Add',
    ...options,
  });
}
