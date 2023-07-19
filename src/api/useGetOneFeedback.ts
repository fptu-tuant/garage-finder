import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Options = BaseQueryApiOptions<{
  feedbackID: number;
  name: null;
  star: number;
  content: string;
  dateTime: string;
  linkImage: string;
}> & {
  id: number;
};

export function useGetOneFeedback({ id, ...options }: Options) {
  return useBaseQueryApi({
    method: 'POST',
    endpoint: `/api/Feedback/getByGFOrderId/${id}`,
    ...options,
  });
}
