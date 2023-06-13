import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

export default function OrderManagementPage() {
  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://garage-finder.azurewebsites.net/GetAllOrder')
      .withAutomaticReconnect()
      .build();

    setConnection(connection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message) => {
            notification.open({
              message: 'New Notification',
              description: message,
            });
          });
        })
        .catch((error) => console.error(error));
    }
  }, [connection]);

  return <div>OrderManagementPage</div>;
}
