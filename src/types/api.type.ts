import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type BaseApiVariables = {
  body?: unknown;
  params?: Record<string, unknown>;
};

export type BaseMutationApiOptions<
  DataResponse,
  Variables extends BaseApiVariables = BaseApiVariables
> = Omit<UseMutationOptions<DataResponse, unknown, Variables>, 'mutationFn'>;

export type BaseQueryApiOptions<
  DataResponse,
  Variables extends BaseApiVariables = BaseApiVariables
> = Omit<
  UseQueryOptions<DataResponse, unknown, DataResponse, [string, Variables]>,
  'queryFn' | 'queryKey'
> & {
  queryKey?: string;
  variables?: Variables;
};
