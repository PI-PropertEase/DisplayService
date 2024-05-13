import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"
import { useContext } from "react"
import { EventContext } from "../context/EventContext"
import { PropertyContext } from "../context/PropertyContext"
import { insertPropertyInEvent } from "../utils/reservationpropertyunifier"
import { IEventType } from "../types/ReservationType"

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

  const unifiedData = insertPropertyInEvent(propertyData, events)

  const convertEventData = (): IWeekCalendarType[] => {
    if (!unifiedData) return []
    const convertedEvents: IWeekCalendarType[] = []

    unifiedData.forEach((e) => {
      const title = (e.type === IEventType.CLEANING ? "Cleaning 🧹 - " + e.property?.title : 
                    e.type === IEventType.MAINTENANCE ? "Maintenance 🔧 - " + e.property?.title :
                    e.type === IEventType.RESERVATION ? e.property?.title : "No title" ) ?? "No title"
      console.log("title em questão: ", title)
      convertedEvents.push({
        title: title,
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
