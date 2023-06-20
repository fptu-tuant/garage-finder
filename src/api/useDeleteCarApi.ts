import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type DeleteCarApiProps = BaseMutationApiOptions<string> & {
  carId: number;
};

export function useDeleteCarApi(props: DeleteCarApiProps) {
  const { carId, ...options } = props;

  return useBaseMutationApi({
    method: 'DELETE',
    endpoint: `/api/Car/Delete/${carId}`,
    ...options,
  });
}
