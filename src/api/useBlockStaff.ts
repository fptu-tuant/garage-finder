import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type BlockStaffVariables = {
  body: {
    staffID: number;
    status: string;
  };
};

export function useBlockStaff(
  options?: BaseMutationApiOptions<string, BlockStaffVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Staff/block',
    ...options,
  });
}
