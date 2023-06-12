import { useBaseQueryApi } from './useBaseQueryApi';

type GetMyGarageData = Array<{
  garageID: number;
  garageName: string;
  addressDetail: string;
  provinceID: number;
  districtsID: number;
  emailAddress: string;
  phoneNumber: string;
  status: string;
  openTime: string;
  closeTime: string;
  thumbnail: string;
  latAddress: number;
  lngAddress: number;
  categoryGarages: number[];
  garageBrands: number[];
  imageGarages: string[];
}>;

export function useGetMyGarageApi() {
  return useBaseQueryApi<GetMyGarageData>({
    endpoint: '/api/Garage/GetByUser',
  });
}
