import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetSASUriForUploadApi() {
  return useBaseQueryApi<string>({
    queryKey: 'getImageUrl',
    enabled: false,
    endpoint: '/api/User/getSASUriForUpload',
  });
}
