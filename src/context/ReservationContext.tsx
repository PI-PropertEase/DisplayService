/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchReservations, fetchReservationsByPropertyId } from "../services/calendar.service"
import { IReservation } from "../types/ReservationType"
import { useParams } from "react-router-dom"

interface ReservationContextType {
  reservations: IReservation[]
  setReservations: React.Dispatch<React.SetStateAction<IReservation[]>>
  reservationsByPropertyId: IReservation[]
  setReservationsByPropertyId: React.Dispatch<React.SetStateAction<IReservation[]>>
}

const defaultContextState: ReservationContextType = {
  reservations: [],
  setReservations: () => {},
  reservationsByPropertyId: [],
  setReservationsByPropertyId: () => {},
}

export const ReservationContext = createContext<ReservationContextType>(defaultContextState)

export const ReservationContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reservations, setReservations] = useState<IReservation[]>([])
  const [reservationsByPropertyId, setReservationsByPropertyId] = useState<IReservation[]>([])

  const authHeader = useAuthHeader() ?? ""
  const id = useParams<{ id: string }>().id?.toString() ?? "";

  const { data: initialReservations } = useQuery<IReservation[]>(
    "fetchReservations",
    () => fetchReservations(authHeader ?? ""),
    {
      staleTime: 100,
    }
  )


  const { data: initialReservationsByPropertyId } = useQuery<IReservation[]>(
    `fetchReservationsProperty${id}`,
    () => fetchReservationsByPropertyId(authHeader ?? "", id),
    {
      staleTime: 100,
    }
  )

  useEffect(() => {
    if (initialReservations) {
      setReservations(initialReservations)
    }
  }, [initialReservations])

  useEffect(() =>  {
    if (initialReservationsByPropertyId)
      setReservationsByPropertyId(initialReservationsByPropertyId)
  }, [initialReservationsByPropertyId])

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        setReservations,
        reservationsByPropertyId,
        setReservationsByPropertyId
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
