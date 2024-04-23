import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchReservations } from "../services/calendar.service"
import { IReservation } from "../types/ReservationType"

interface ReservationContextType {
  reservations: IReservation[]
  setReservations: React.Dispatch<React.SetStateAction<IReservation[]>>
}

const defaultContextState: ReservationContextType = {
  reservations: [],
  setReservations: () => {},
}

export const ReservationContext = createContext<ReservationContextType>(defaultContextState)

export const ReservationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<IReservation[]>([])

  const authHeader = useAuthHeader() ?? ""

  const { data: initialReservations } = useQuery<IReservation[]>("fetchReservations", () =>
    fetchReservations(authHeader ?? "")
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
