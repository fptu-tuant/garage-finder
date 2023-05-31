import axios, { AxiosResponse } from 'axios';
import { toLower } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

export type BaseApiCallProps<TResponseData, TVariables> = {
  variables?: TVariables;
  onCompleted?: (data: TResponseData) => void;
  onError?: (e: unknown) => void;
};

type UseBaseApiProps<TResponseData, TVariables> = BaseApiCallProps<
  TResponseData,
  TVariables
> & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
};

export function useBaseApi<TResponseData, TVariables>({
  method,
  url,
  variables,
  onCompleted,
  onError,
}: UseBaseApiProps<TResponseData, TVariables>) {
  const [data, setData] = useState<TResponseData>();
  const [loading, setLoading] = useState(false);

  const call = useCallback(
    async (props?: BaseApiCallProps<TResponseData, TVariables>) => {
      setLoading(true);

      const _variables = props?.variables || variables;
      const _onCompleted = props?.onCompleted || onCompleted;
      const _onError = props?.onError || onError;

      try {
        const { data } = await axios<
          TResponseData,
          AxiosResponse<TResponseData>,
          TVariables
        >({
          method: toLower(method),
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          data: _variables,
        });

        setData(data);
        _onCompleted?.(data);
      } catch (error) {
        console.error(error);
        _onError?.(error);
      }

      setLoading(false);
    },
    [method, onCompleted, onError, url, variables]
  );

  useEffect(() => {
    if (method === 'GET') {
      call();
    }
  }, [call, method]);

  return {
    data,
    loading,
    recall: call,
  };
}
