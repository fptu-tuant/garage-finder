import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Report = {
  reportID: string;
  reason: string;
  // imageLink: string[] | null;
  date: string;
  garageName: string;
  garagePhone: string;
  garageMail: string;
  userEmail: string;
  garageID: number;
  userID: number;
  imageReport: Array<{
    imageID: number;
    reportID: number;
    imageLink: string;
  }>;
};

export function useGetListReport(options?: BaseQueryApiOptions<Report[]>) {
  return useBaseQueryApi({
    endpoint: '/api/Report/GetListReport',
    ...options,
  });
}
