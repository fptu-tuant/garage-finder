import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type Variables = {
  body: Array<{
    garageID: number;
    imageLink: string;
  }>;
};

export function useAddGargeImages(
  options?: BaseMutationApiOptions<string, Variables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Garage/addImage',
    ...options,
  });
}
