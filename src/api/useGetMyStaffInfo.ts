import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';
import { Staff } from './useGetStaffs';

export function useGetMyStaffInfo(options?: BaseQueryApiOptions<Staff>) {
  return useBaseQueryApi({
    method: 'POST',
    endpoint: '/api/Staff/getMyStaffInfor',
    ...options,
  });
}
