import { CalendarEventInterface } from "../types/CalendarTypes"
import { IFetchProperty } from "../types/PropertyType"
import { IEvent } from "../types/ReservationType"
import { insertPropertyInEvent } from "./reservationpropertyunifier"

export const convertToCalendarInterface = (
  fetchedEvents: IEvent[],
  properties: IFetchProperty[]
): CalendarEventInterface[] => {
  if (!fetchedEvents || !properties) return []

  const calendarEvents: CalendarEventInterface[] = []

  const unifiedData = insertPropertyInEvent(properties, fetchedEvents)
  unifiedData?.forEach((r) => {
    calendarEvents.push({
        platform: r.service as string,
        resourceId: r.property?.title ?? "",
        title: r.property?.title ?? "",
        start: r.begin_datetime.toISOString(),
        end: r.end_datetime.toISOString(),
    })
  })

  return calendarEvents
}
