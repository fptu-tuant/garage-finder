import { useBaseMutationApi } from './useBaseMutationApi';

export default function useDeleteFavoriteGarageApi(id: number) {
  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: `/api/FavoriteList/Delete/${id}`,
  });
}
