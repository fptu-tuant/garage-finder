import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

import { getWebSocketUrl } from '@/services/websocket.service';

export function useSocket() {
  const { lastJsonMessage, lastMessage, sendJsonMessage, getWebSocket } =
    useWebSocket(getWebSocketUrl, {
      share: true,
      shouldReconnect: () => true,
      // onError: (e) => showError('ERROR' + e),
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

  const sendMessageToGarage = (props: {
    garageId: number;
    message: string;
  }) => {
    const { garageId, message } = props;
    console.log('sendMessageToGarage', garageId);

    sendJsonMessage({
      type: 'UserSendMessageToGarage',
      message: {
        Content: message,
        GarageID: garageId,
      },
    });
  };

  return {
    lastJsonMessage,
    lastMessage,
    getUserRooms,
    getMessagesByRoomId,
    sendMessageToGarage,
    connection: getWebSocket(),
  };
}
