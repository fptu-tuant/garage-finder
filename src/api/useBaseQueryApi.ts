import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { BaseApiVariables } from '@/types';
import { api, showError } from '@/utils';

type BaseQueryOptions<TData, TVariables extends BaseApiVariables> = Omit<
  UseQueryOptions<TData, unknown, TData, [string, TVariables]>,
  'queryFn' | 'queryKey'
> & {
  endpoint: string;
  queryKey?: string;
  variables?: TVariables;
};

export function useBaseQueryApi<
  TData = unknown,
  TVariables extends BaseApiVariables = BaseApiVariables
>({
  endpoint,
  queryKey = 'unknown-query',
  variables = {} as TVariables,
  ...options
}: BaseQueryOptions<TData, TVariables>) {
  const { refetch, ...query } = useQuery({
    ...options,
    queryKey: [queryKey, variables],
    queryFn: async (ctx: QueryFunctionContext<[string, TVariables]>) => {
      const [, { body, params }] = ctx.queryKey;

      try {
        const { data } = await api<TData>({
          method: 'GET',
          url: endpoint,
          data: body,
          params,
        });

        return data;
      } catch (error) {
        showError(error);
        throw Error(`Something error: ${error}`);
      }
    },
  });

  return {
    ...query,
    refetch: (variables?: TVariables) =>
      refetch({ queryKey: [queryKey, variables] }),
  };
}
