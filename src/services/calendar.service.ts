import axios from "axios"
import { IReservation } from "../types/ReservationType"

const URL = "http://localhost/api/CalendarService"

export const fetchReservations = async (authHeader: string) => {
  const res = await axios.get<IReservation[]>(`${URL}/reservations`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const reservations: IReservation[] = res.data.map((r: IReservation) => ({
    ...r,
    begin_datetime: new Date(
      Date.UTC(
        parseInt(r.begin_datetime.slice(0, 4)), // Year
        parseInt(r.begin_datetime.slice(5, 7)) - 1, // Month (months are zero-based)
        parseInt(r.begin_datetime.slice(8, 10)), // Day
        parseInt(r.begin_datetime.slice(11, 13)), // Hours
        parseInt(r.begin_datetime.slice(14, 16)), // Minutes
        parseInt(r.begin_datetime.slice(17, 19)) // Seconds
      )
    ),
    end_datetime: new Date(
      Date.UTC(
        parseInt(r.end_datetime.slice(0, 4)), // Year
        parseInt(r.end_datetime.slice(5, 7)) - 1, // Month (months are zero-based)
        parseInt(r.end_datetime.slice(8, 10)), // Day
        parseInt(r.end_datetime.slice(11, 13)), // Hours
        parseInt(r.end_datetime.slice(14, 16)), // Minutes
        parseInt(r.end_datetime.slice(17, 19)) // Seconds
      )
),
  }))

  return reservations
}
