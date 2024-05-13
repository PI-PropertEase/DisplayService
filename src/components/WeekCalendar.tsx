import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"
import { useContext } from "react"
import { EventContext } from "../context/EventContext"
import { PropertyContext } from "../context/PropertyContext"
import { insertPropertyInEvent } from "../utils/reservationpropertyunifier"

// type that is displayed on the calendar of this page
interface IWeekCalendarType {
  title: string
  start: string
  end: string
}

export default function WeekCalendar() {
  const { events } = useContext(EventContext)
  const { properties: propertyData } = useContext(PropertyContext)

  if (!events || !propertyData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  console.log(events)
  console.log(propertyData)

  const unifiedData = insertPropertyInEvent(propertyData, events)

  const convertEventData = (): IWeekCalendarType[] => {
    if (!unifiedData) return []
    const convertedEvents: IWeekCalendarType[] = []

    unifiedData.forEach((e) => {
      convertedEvents.push({
        title: e.property?.title ?? "No title",
        start: e.begin_datetime.toISOString().split("T")[0],
        end: e.end_datetime.toISOString().split("T")[0],
      })
    })

    return convertedEvents
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
      events={convertEventData()}
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
    />
  )
}
