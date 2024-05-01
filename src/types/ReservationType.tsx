import { ServiceEnum } from "./UserType"

// Generic Event type
export interface IEvent {
  id?: number
  property_id: number
  owner_email: string
  begin_datetime: Date
  end_datetime: Date
  type: IEventType
  service?: ServiceEnum
}

export enum IEventType {
  RESERVATION = "reservation",
  CLEANING = "cleaning",
  MAINTENANCE = "maintenance",
}

export interface IReservation extends IEvent {
  reservation_status: ReservationStatus
  client_email: string
  client_name: string
  client_phone: string
  cost: number
}

export enum ReservationStatus {
  CONFIRMED = "confirmed",
  PENDING = "pending",
  CANCELED = "canceled",
}

// No attributes (for now)
export interface ICleaning extends IEvent {

}

// No attributes (for now)
export interface IMaintenance extends IEvent {
  
}
