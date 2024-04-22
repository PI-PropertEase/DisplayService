export interface IUser {
  id: number;
  email: string;
  connected_services: IConnectedService[];
}

interface IConnectedService {
  title: ServiceEnum;
}

export enum ServiceEnum {
  ZOOKING = "zooking",
  CLICKANDGO = "clickandgo",
  EARTHSTAYIN = "earthstayin"
}