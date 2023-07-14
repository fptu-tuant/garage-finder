import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Staffs = Array<{
  staffId: number;
  name: string;
  // employeeId: number | null;
  phoneNumber: string;
  linkImage: string;
  addressDetail: string;
  districtId: number;
  provinceId: number;
  status: null;
  emailAddress: string;
}>;

export function useGetStaffs({
  id,
  ...options
}: BaseQueryApiOptions<Staffs> & { id: number }) {
  return useBaseQueryApi({
    endpoint: `/api/Staff/getByGarage/${id}`,
    ...options,
  });
}
