import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Layout, List, Spin } from 'antd';
import { isNil } from 'lodash-es';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetGarageByIdApi } from '@/api';
import { useSocket } from '@/api/useSocket';
import { UserDashboardSider } from '@/components';
import { useAuthStore } from '@/context';
import {
  isDetailRoom,
  isWsGetList,
  isWsMessage,
} from '@/services/websocket.service';
import { Message, Room } from '@/types';
import { twcx } from '@/utils';

const { Sider, Content } = Layout;

function Conversations() {
  const [{ user }] = useAuthStore();
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>();
  const { getUserRooms, lastJsonMessage } = useSocket();

  useEffect(() => {
    getUserRooms(user?.id);
  }, [getUserRooms, user?.id]);

  useEffect(() => {
    if (isWsGetList(lastJsonMessage)) {
      setRooms(lastJsonMessage as Room[]);
    }
  }, [lastJsonMessage]);

  const onItemClick = (room: Room) => {
    router.push(
      {
        query: {
          ...router.query,
          roomId: room.RoomID,
          garageId: room.GarageID,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="overflow-y-auto">
      <List
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={(room) => (
          <List.Item
            onClick={() => onItemClick(room)}
            className="shadow-md mb-6 rounded-md hover:bg-slate-100 p-4 hover:cursor-pointer"
          >
            <List.Item.Meta
              avatar={<Avatar src={room.LinkImage} />}
              title={room.Name}
              description={room.Content}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

function Detail() {
  const { query, push } = useRouter();

  const [form] = Form.useForm();

  const { garageId, roomId } = query as { garageId: string; roomId: string };

  const roomID = Number(roomId);
  const garageID = Number(garageId);

  const { data: garage } = useGetGarageByIdApi(
    { enabled: !isNaN(garageID) },
    { id: garageID }
  );

  const [{ user }] = useAuthStore();

  const [messages, setMessages] = useState<Message[]>();

  const {
    lastJsonMessage,
    getMessagesByRoomId,
    sendMessageToGarage,
    getUserRooms,
  } = useSocket();

  useEffect(() => {
    !isNaN(roomID) && getMessagesByRoomId(roomID);
  }, [getMessagesByRoomId, roomID]);

  useEffect(() => {
    isNaN(roomID) && getUserRooms(user?.id);
  }, [getUserRooms, roomID, user?.id]);

  useEffect(() => {
    if (isWsMessage(lastJsonMessage)) {
      getMessagesByRoomId(roomID);
    }

    if (isDetailRoom(lastJsonMessage)) {
      console.log('here');
      setMessages(lastJsonMessage as Message[]);
    }

    if (isWsGetList(lastJsonMessage)) {
      const room = (lastJsonMessage as Room[]).find(
        (room) => room.GarageID === garage?.garageID
      );

      if (room) {
        push({ query: { ...query, roomId: room.RoomID } }, undefined, {
          shallow: true,
        });
      }
    }
  }, [
    garage?.garageID,
    getMessagesByRoomId,
    lastJsonMessage,
    push,
    query,
    roomID,
  ]);

  const onSendMessage = (message: string) => {
    sendMessageToGarage({
      garageId: garageID,
      message,
    });

    isNaN(roomID) ? getUserRooms(user?.id) : getMessagesByRoomId(roomID);
  };

  return (
    <div className="h-full relative py-20 flex flex-col">
      <div className="h-20 absolute top-0 inset-x-0 flex items-center px-2 border-b border-0 border-solid border-slate-100 gap-4">
        <Button
          type="ghost"
          icon={<ArrowLeftOutlined className="text-xl" />}
          className="hover:text-purple-800"
          onClick={() => push('/manage/chat')}
        />

        <Avatar className="ml-4" src={garage?.thumbnail} />

        <span className="font-bold text-xl">{garage?.garageName}</span>
      </div>

      <div
        className="grow p-2 overflow-y-auto pt-3"
        ref={(ref) => ref?.scrollTo({ top: 999999999, behavior: 'smooth' })}
      >
        <Spin spinning={isNil(messages) && !!roomId}>
          {messages?.map((message) => (
            <div
              key={message.DateTime}
              className={twcx('flex gap-2 items-center mb-3', {
                ['flex-row-reverse']: message.IsSendByMe,
              })}
            >
              <Avatar
                src={message.IsSendByMe ? user?.avatar : garage?.thumbnail}
              />
              <p className="bg-slate-200 p-3 rounded-full text-slate-900 m-0">
                {message.Content}
              </p>
            </div>
          ))}
        </Spin>

        {/* <div ref={bottomRef} /> */}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex gap-3 items-center">
        <Avatar src={user?.avatar} />

        <Form
          className="w-full"
          form={form}
          onFinish={(values) => {
            onSendMessage(values?.message);
            form.resetFields();
          }}
          initialValues={{ message: '' }}
        >
          <Form.Item name="message" noStyle>
            <Input className="rounded-full w-full" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default function UserChatPage() {
  const { query } = useRouter();
  const { roomId, garageId } = query as { roomId: string; garageId: string };

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10 h-[60vh]">
        {roomId || garageId ? <Detail key={garageId} /> : <Conversations />}
      </Content>
    </Layout>
  );
}
