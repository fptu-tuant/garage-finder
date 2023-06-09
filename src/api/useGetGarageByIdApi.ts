import { BaseQueryApiOptions } from '@/types';

import { useBaseQueryApi } from './useBaseQueryApi';

type GetGarageData = Array<{
  id: number;
}>;

export function useGetGarageByIdApi(
  options?: BaseQueryApiOptions<GetGarageData>
) {
  // return useBaseQueryApi({
  //   queryKey: 'garages',
  //   endpoint: '/api/Garage/GetAll',
  //   ...options,
  // });
  return {
    data: {
      garageID: 2,
      userID: 2,
      garageName: 'Store Detailing',
      addressDetail: '157 Xô Viết Nghệ Tĩnh, quận Cẩm Lệ, Đà Nẵng',
      provinceID: 48,
      districtsID: 1,
      emailAddress: 'garage1@gmail.com',
      phoneNumber: '0905123123',
      status: null,
      openTime: '07:00:00.0000000',
      closeTime: '17:00:00.0000000',
      logo: null,
      imagies:
        'https://garagefinder.blob.core.windows.net/garage-finder/garage-finder/users/2/garages/2/images/store-detailing.jpg',
      latAddress: 16.03112426308547,
      lngAddress: 108.21059626191833,
      serviceDTO: null,
      garageBrandDTO: null,
    },
  };
}
