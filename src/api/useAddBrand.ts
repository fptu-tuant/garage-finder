import { useBaseQueryApi } from './useBaseQueryApi';

export function useAddBrand() {
  return useBaseQueryApi({
    endpoint: '/api/Brand/GetAll',
  });
}
