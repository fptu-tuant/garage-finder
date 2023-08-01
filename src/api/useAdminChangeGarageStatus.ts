import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

export function useAdminChangeGarageStatus(
  options?: BaseMutationApiOptions<
    string,
    { body: { garageId: number; status: string } }
  >
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Admin/SetStatusGarage',
    ...options,
  });
}
