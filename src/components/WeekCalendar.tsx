import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { IReservation } from "../types/ReservationType";
import { fetchReservations } from "../services/calendar.service";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "react-query";

// type that is displayed on the calendar of this page
interface IWeekCalendarType {
  title: string;
  start: string;
  end: string;
}

export default function WeekCalendar() {
  const authHeader = useAuthHeader() ?? "";

  const { data: reservationData, isLoading: loading } = useQuery<IReservation[]>(
    "fetchReservations",
    () => fetchReservations(authHeader).then((data) => data),
    { staleTime: Infinity }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  console.log("reservation data: ", reservationData);

  const convertReservationData = (): IWeekCalendarType[] => {
    if (reservationData === undefined)
        return [];
    const convertedReservations: IWeekCalendarType[] = [];
    
    reservationData.forEach((r) => {
      console.log("RESERVATION R", r)
      console.log("reservation begin date", r.begin_datetime, typeof r.begin_datetime)
      convertedReservations.push({
        title: "Static title :)",
        start: r.begin_datetime.toISOString().split("T")[0],
        end: r.end_datetime.toISOString().split("T")[0]
      })
    })

    return convertedReservations;
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      headerToolbar={{
        left: "title",
        end: "prev today next"
      }}
      height={"100%"}
      buttonIcons={{prev: 'chevron-left', next: 'chevron-right'}}
      events={
        convertReservationData()
      }
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
      
     />
  );
}
