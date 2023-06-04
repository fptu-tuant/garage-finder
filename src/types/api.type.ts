import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type BaseApiVariables = {
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
};

export type BaseMutationApiOptions<DataResponse, Variables> = Omit<
  UseMutationOptions<DataResponse, unknown, Variables>,
  'mutationFn'
>;

export type BaseQueryApiOptions<DataResponse, Variables> = Omit<
  UseQueryOptions<DataResponse, unknown, Variables>,
  'queryFn'
>;
