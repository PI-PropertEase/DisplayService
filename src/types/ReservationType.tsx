import { ServiceEnum } from "./UserType"

export interface IReservation {
  id: number
  property_id: number
  reservation_status: ReservationStatus
  begin_datetime: Date
  end_datetime: Date
  service: ServiceEnum
  cost: number
  client_phone: string
  client_name: string
  client_email: string
}

export enum ReservationStatus {
  CONFIRMED = "confirmed",
  PENDING = "pending",
  CANCELED = "canceled",
}
