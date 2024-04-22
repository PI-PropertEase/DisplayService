import axios from "axios"
import { IReservation } from "../types/ReservationType";

const URL = "http://localhost/api/CalendarService"

export const fetchReservations = async (authHeader: string) => {
    const res = await axios.get(`${URL}/reservations/6`, {
        headers: {
            Authorization: authHeader,
        },
    })
    return res.data as IReservation[];
}
