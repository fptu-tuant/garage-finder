import { first, has, isArray, isObject } from 'lodash-es';
import { ReadyState } from 'react-use-websocket';

import { ACCESS_TOKEN_KEY, WEB_SOCKET_URL } from '@/constants';
import { Message, Room } from '@/types';

export const getWebSocketStatus = (readyState: ReadyState) =>
  ({
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]);

export const getWebSocketUrl = () => {
  const item = localStorage.getItem(ACCESS_TOKEN_KEY);

  return `${WEB_SOCKET_URL}?access_token=${item}`;
};

export const isWsGetList = (event: unknown): event is Room[] => {
  return isArray(event) && has(first(event), 'RoomID');
};

export const isDetailRoom = (event: unknown): event is Message[] => {
  return isArray(event) && has(first(event), 'IsSendByMe');
};

export const isWsMessage = (event: unknown) => {
  return isObject(event) && (event as { type: string }).type === 'chat';
};

export const isWsNotification = (event: unknown) => {
  return isObject(event) && (event as { type: string }).type === 'Notify';
};

export const isWsNofitications = (event: unknown) => {
  return (
    isArray(event) &&
    has(first(event), 'DateTime') &&
    has(first(event), 'Content') &&
    has(first(event), 'IsRead')
  );
};
