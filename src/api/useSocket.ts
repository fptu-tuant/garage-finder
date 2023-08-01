import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

import { getWebSocketUrl } from '@/services/websocket.service';
import { showError, showSuccess } from '@/utils';

export function useSocket() {
  const { lastJsonMessage, lastMessage, sendJsonMessage, getWebSocket } =
    useWebSocket(getWebSocketUrl, {
      share: true,
      shouldReconnect: () => true,
      // onError: (e) => showError('ERROR' + e),
      onClose: () => showError('WS closed'),
      onOpen: () => showSuccess('WS connect'),
    });

  const getUserRooms = useCallback(
    (userId?: number) => {
      console.log('getUserRooms', userId);
      sendJsonMessage({
        type: 'GetListRoomByUserId',
        message: userId,
      });
    },
    [sendJsonMessage]
  );

  const getMessagesByRoomId = useCallback(
    (roomId: number) => {
      console.log('getMessagesByRoomId', roomId);
      sendJsonMessage({
        type: 'GetDetailRoom',
        message: roomId,
      });
    },
    [sendJsonMessage]
  );

  const sendMessageToGarage = useCallback(
    (props: { garageId: number; message: string }) => {
      const { garageId, message } = props;
      console.log('sendMessageToGarage', garageId);

      sendJsonMessage({
        type: 'UserSendMessageToGarage',
        message: {
          Content: message,
          GarageID: garageId,
        },
      });
    },
    [sendJsonMessage]
  );

  const sendMessageToUser = useCallback(
    (props: {
      message: string;
      userId: number | undefined;
      garageId: number;
    }) => {
      const { message, garageId, userId } = props;

      console.log('sendMessageToUser', { userId, garageId });
      sendJsonMessage({
        type: 'GarageSendMessgeToUser',
        message: {
          Content: message,
          UserID: userId,
          FromGarageId: garageId,
        },
      });
    },
    [sendJsonMessage]
  );

  const getGarageRooms = useCallback(
    (garageId: number | undefined) => {
      console.log('getGarageRooms', { garageId });
      sendJsonMessage({
        type: 'GetListRoomByGarageId',
        message: garageId,
      });
    },
    [sendJsonMessage]
  );

  return {
    lastJsonMessage,
    lastMessage,
    connection: getWebSocket(),
    getUserRooms,
    getMessagesByRoomId,
    sendMessageToGarage,
    sendMessageToUser,
    getGarageRooms,
  };
}
