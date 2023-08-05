import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddReportVariables = {
  body: {
    garageID: number;
    reason: string;
    imageLink: string[];
  };
};

export function useAddReport(
  options?: BaseMutationApiOptions<string, AddReportVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Report/AddReport',
    ...options,
  });
}
