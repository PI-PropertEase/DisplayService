import axios from "axios"
import { IReservation } from "../types/ReservationType";

const URL = "http://localhost/api/CalendarService"

export const fetchReservations = async (authHeader: string) => {
    const res = await axios.get<IReservation[]>(`${URL}/reservations`, {
        headers: {
            Authorization: authHeader,
        },
    })

    // serialize into right data types
    const reservations: IReservation[] = res.data.map((r: IReservation) => ({
      ...r,
      begin_datetime: new Date(r.begin_datetime),
      end_datetime: new Date(r.end_datetime),
    }));

    return reservations;
}
