import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetOneFeedback() {
  return useBaseQueryApi({
    endpoint: '/api/Feedback/getByGFOrderId',
  });
}
