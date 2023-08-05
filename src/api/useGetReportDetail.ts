import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Report = {
  reportID: string;
  reason: string;
  imageLink: string[];
  date: string;
  garageName: string;
  garagePhone: string;
  garageMail: string;
  userEmail: string;
  garageID: number;
  userID: number;
};

export function useGetReportDetail(
  options?: BaseQueryApiOptions<Report, { params: { id: string } }>
) {
  return useBaseQueryApi({
    endpoint: '/api/Report/GetReportByID',
    ...options,
  });
}
