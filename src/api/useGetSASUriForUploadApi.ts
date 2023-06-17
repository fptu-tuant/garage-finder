import { useBaseQueryApi } from './useBaseQueryApi';

export function useGetSASUriForUploadApi() {
  return useBaseQueryApi<string>({
    enabled: false,
    endpoint: '/api/User/getSASUriForUpload',
  });
}
