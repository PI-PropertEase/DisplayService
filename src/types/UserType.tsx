// schema from backend response when GET /user
export interface IUser {
  id: number;
  email: string;
  connected_services: IConnectedService[];
}

// schema for saved user state on cookie (react-auth-kit sign in)
export interface IUserState extends IUser {
  name: string;
  photoURL: string;
}

interface IConnectedService {
  title: ServiceEnum;
}

export enum ServiceEnum {
  ZOOKING = "zooking",
  CLICKANDGO = "clickandgo",
  EARTHSTAYIN = "earthstayin"
}