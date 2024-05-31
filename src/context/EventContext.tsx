/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchEvents } from "../services/calendar.service"
import { IEvent } from "../types/ReservationType"

interface EventContextType {
  events: IEvent[]
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
}

const defaultContextState: EventContextType = {
  events: [],
  setEvents: () => {},
}

export const EventContext = createContext<EventContextType>(defaultContextState)

export const EventContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<IEvent[]>([])

  const authHeader = useAuthHeader() ?? ""

  const { data: initialEvents } = useQuery<IEvent[]>(
    "fetchEvents",
    () => fetchEvents(authHeader ?? ""),
    {
      staleTime: 10000,
    }
  )


  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents)
    }
  }, [initialEvents])

  return (
    <EventContext.Provider
      value={{
        events: events,
        setEvents: setEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
