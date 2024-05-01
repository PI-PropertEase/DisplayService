import { ServiceEnum } from "./UserType"

export interface IEvent {
  id: number
  property_id: number
  owner_email: string
  begin_datetime: Date
  end_datetime: Date
  type: string
  service?: ServiceEnum
}


export enum ReservationStatus {
  CONFIRMED = "confirmed",
  PENDING = "pending",
  CANCELED = "canceled",
}
