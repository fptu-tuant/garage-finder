import { BaseMutationApiOptions } from '@/types';

import { useBaseMutationApi } from './useBaseMutationApi';

type AddFeedbackVariables = {
  body: {
    gfOrderID: number;
    star: number;
    content: string;
  };
};

export function useAddFeedback(
  options?: BaseMutationApiOptions<string, AddFeedbackVariables>
) {
  return useBaseMutationApi({
    method: 'POST',
    endpoint: '/api/Feedback/Add',
    ...options,
  });
}
