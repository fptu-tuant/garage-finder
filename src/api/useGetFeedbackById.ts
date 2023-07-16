import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type Feedbacks = Array<{
  feedbackID: number;
  name: string;
  star: number;
  content: string;
  dateTime: string;
  linkImage: string | null;
}>;

export function useGetFeedbackById(
  id: number,
  options?: BaseQueryApiOptions<Feedbacks>
) {
  return useBaseQueryApi({
    endpoint: `/api/Feedback/GetByGarage/${id}`,
    ...options,
  });
}
