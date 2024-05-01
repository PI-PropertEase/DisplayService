import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchReservations } from "../services/calendar.service"
import { IEvent } from "../types/ReservationType"

interface ReservationContextType {
  reservations: IEvent[]
  setReservations: React.Dispatch<React.SetStateAction<IEvent[]>>
}

const defaultContextState: ReservationContextType = {
  reservations: [],
  setReservations: () => {},
}

export const ReservationContext = createContext<ReservationContextType>(defaultContextState)

export const ReservationContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reservations, setReservations] = useState<IEvent[]>([])

  const authHeader = useAuthHeader() ?? ""

  const { data: initialReservations } = useQuery<IEvent[]>(
    "fetchReservations",
    () => fetchReservations(authHeader ?? ""),
    {
      staleTime: 10000,
    }
  )

  useEffect(() => {
    if (initialReservations) {
      setReservations(initialReservations)
    }
  }, [initialReservations])

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
