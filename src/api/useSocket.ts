import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

import { getWebSocketUrl } from '@/services/websocket.service';
import { showError, showSuccess } from '@/utils';

export function useSocket() {
  const { lastJsonMessage, lastMessage, sendJsonMessage, getWebSocket } =
    useWebSocket(getWebSocketUrl, {
      share: true,
      shouldReconnect: () => true,
    });

  const getUserRooms = useCallback(
    (userId?: number) => {
      sendJsonMessage({
        type: 'GetListRoomByUserId',
        message: userId,
      });
    },
    [sendJsonMessage]
  );

  const getMessagesByRoomId = useCallback(
    (roomId: number) => {
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
      sendJsonMessage({
        type: 'GetListRoomByGarageId',
        message: garageId,
      });
    },
    [sendJsonMessage]
  );

  const getAllNotifications = useCallback(
    () =>
      sendJsonMessage({
        type: 'GetAllNotification',
      }),
    [sendJsonMessage]
  );

  const readAllNotifications = useCallback(
    () =>
      sendJsonMessage({
        type: 'ReadAllNotification',
      }),
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
    getAllNotifications,
    readAllNotifications,
  };
}
