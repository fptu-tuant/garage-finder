import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from 'axios';

import { BaseApiVariables } from '@/types';
import { api } from '@/utils';

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

type BaseMutationOptions<
  TData = unknown,
  TVariables = void,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, unknown, TVariables, TContext>,
  'mutationFn'
> & {
  method: 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
};

export function useBaseMutationApi<
  TData = unknown,
  TVariables extends BaseApiVariables = BaseApiVariables,
  TContext = unknown
>({
  method,
  endpoint,
  headers,
  ...options
}: BaseMutationOptions<TData, TVariables, TContext>) {
  return useMutation({
    ...options,
    mutationFn: async ({ body, params, id }: TVariables) => {
      const { data } = await api<TData>({
        method,
        url: id ? `${endpoint}/${id}` : endpoint,
        data: body,
        params,
        headers,
      });

      return data;
    },
  });
}
