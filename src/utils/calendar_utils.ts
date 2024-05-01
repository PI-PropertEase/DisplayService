import { CalendarEventInterface } from "../types/CalendarTypes"
import { IFetchProperty } from "../types/PropertyType"
import { IEvent } from "../types/ReservationType"
import { insertPropertyInReservation } from "./reservationpropertyunifier"

export const convertToCalendarInterface = (
  reservations: IEvent[],
  properties: IFetchProperty[]
): CalendarEventInterface[] => {
  if (!reservations || !properties) return []

  const events: CalendarEventInterface[] = []

  const unifiedData = insertPropertyInReservation(properties, reservations)

  unifiedData?.forEach((r) => {
    events.push({
        platform: r.service,
        resourceId: r.property?.title ?? "",
        title: r.property?.title ?? "",
        start: r.begin_datetime.toISOString().split('T')[0],
        end: r.end_datetime.toISOString().split('T')[0],
    })
  })

  return events
}
