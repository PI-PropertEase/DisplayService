import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"
import { useContext } from "react"
import { ReservationContext } from "../context/ReservationContext"
import { PropertyContext } from "../context/PropertyContext"
import { unifyPropertyReservation } from "../utils/reservationpropertyunifier"

// type that is displayed on the calendar of this page
interface IWeekCalendarType {
  title: string
  start: string
  end: string
}

export default function WeekCalendar() {
  const { reservations: reservationData } = useContext(ReservationContext)
  const { properties: propertyData } = useContext(PropertyContext)

  const unifiedData = unifyPropertyReservation(propertyData, reservationData)

  if (!reservationData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }


  const convertReservationData = (): IWeekCalendarType[] => {
    if (!unifiedData) return []
    const convertedReservations: IWeekCalendarType[] = []


    unifiedData.forEach((r) => {
      convertedReservations.push({
        title: r.property?.title ?? "No title",
        start: r.begin_datetime.toISOString().split("T")[0],
        end: r.end_datetime.toISOString().split("T")[0],
      })
    })

    return convertedReservations
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      headerToolbar={{
        left: "title",
        end: "prev today next",
      }}
      height={"100%"}
      buttonIcons={{ prev: "chevron-left", next: "chevron-right" }}
      events={convertReservationData()}
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
    />
  )
}
