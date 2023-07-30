export type Room = {
  RoomID: number;
  GarageID: number;
  UserID: number;
  Name: string;
  LinkImage: string;
  DateTime: string;
  Content: string;
};

export type Message = {
  DateTime: string;
  Content: string;
  IsSendByMe: boolean;
};
