import axios from "axios"
import { IReservation } from "../types/ReservationType"

const URL = "http://localhost/api/CalendarService"


const parseISODateToUTCDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  )
}

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
    begin_datetime: parseISODateToUTCDate(r.begin_datetime),
    end_datetime: parseISODateToUTCDate(r.end_datetime),
  }))

  return reservations
}
