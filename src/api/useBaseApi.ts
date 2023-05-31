import axios, { AxiosResponse } from 'axios';
import { toLower } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

export type BaseApiCallProps<
  TResponseData,
  TBody,
  TParams = Record<string, string>
> = {
  body?: TBody;
  params?: TParams;
  onCompleted?: (data: TResponseData) => void;
  onError?: (e: unknown) => void;
};

type UseBaseApiProps<TResponseData, TBody, TParams> = BaseApiCallProps<
  TResponseData,
  TBody,
  TParams
> & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
};

export function useBaseApi<TResponseData, TBody, TParams>({
  method,
  url,
  body,
  params,
  onCompleted,
  onError,
}: UseBaseApiProps<TResponseData, TBody, TParams>) {
  const [data, setData] = useState<TResponseData>();
  const [loading, setLoading] = useState(false);

  const call = useCallback(
    async (props?: BaseApiCallProps<TResponseData, TBody, TParams>) => {
      setLoading(true);

      const _body = props?.body || body;
      const _params = props?.params || params;
      const _onCompleted = props?.onCompleted || onCompleted;
      const _onError = props?.onError || onError;

      try {
        const { data } = await axios<
          TResponseData,
          AxiosResponse<TResponseData>,
          TBody
        >({
          method: toLower(method),
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          data: _body,
          params: _params,
        });

        _onCompleted?.(data);
        setData(data);
      } catch (error) {
        console.error(error);
        _onError?.(error);
      }

      setLoading(false);
    },
    [body, method, onCompleted, onError, params, url]
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
