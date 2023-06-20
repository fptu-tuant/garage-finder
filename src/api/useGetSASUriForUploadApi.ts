import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetSASUriForUploadApi() {
  return useBaseQueryApi<string>({
    queryKey: 'getImageUri',
    enabled: false,
    endpoint: '/api/User/getSASUriForUpload',
  });
}
