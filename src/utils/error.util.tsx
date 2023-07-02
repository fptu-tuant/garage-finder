import { notification } from 'antd';
import { isObject } from 'lodash-es';

import { CloseIcon } from '@/icons';

export function showError(error: unknown) {
  // Default error handler
  let errorMessage = String(error);
  const errorCode =
    isObject(error) && 'code' in error ? String(error.code) : undefined;

  // AxiosError
  if (
    isObject(error) &&
    'response' in error &&
    isObject(error.response) &&
    'data' in error.response
  ) {
    errorMessage = String(error.response.data);
  }

  //-------
  notification.error({
    message: <span className="font-semibold">{errorCode}</span>,
    closeIcon: <CloseIcon />,
    description: errorMessage,
  });
}

export function showSuccess(message: string) {
  notification.success({ message, closeIcon: <CloseIcon />, duration: 0.8 });
}
