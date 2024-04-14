export interface IUser {
  id: number;
  email: string;
  connected_services: IConnectedService[];
}

interface IConnectedService {
  title: string;
}
