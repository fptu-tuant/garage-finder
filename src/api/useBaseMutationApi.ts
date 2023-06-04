import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { BaseApiVariables } from '@/types';
import { api } from '@/utils';

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
};

export function useBaseMutationApi<
  TData = unknown,
  TVariables extends BaseApiVariables = BaseApiVariables,
  TContext = unknown
>({
  method,
  endpoint,
  ...options
}: BaseMutationOptions<TData, TVariables, TContext>) {
  return useMutation({
    ...options,
    mutationFn: async ({ body, params }: TVariables) => {
      const { data } = await api<TData>({
        method,
        url: endpoint,
        data: body,
        params,
      });

      return data;
    },
  });
}
