/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchCleaningEventsByPropertyId, fetchMaintenanceEventsByPropertyId } from "../services/calendar.service"
import { ICleaning, IMaintenance } from "../types/ReservationType"
import { useParams } from "react-router-dom"

interface ManagementContextType {
  cleaningEvents: ICleaning[]
  setCleaningEvents: React.Dispatch<React.SetStateAction<ICleaning[]>>
  maintenanceEvents: IMaintenance[]
  setMaintenanceEvents: React.Dispatch<React.SetStateAction<IMaintenance[]>>
}

const defaultContextState: ManagementContextType = {
  cleaningEvents: [],
  setCleaningEvents: () => {},
  maintenanceEvents: [],
  setMaintenanceEvents: () => {},
}

export const ManagementContext = createContext<ManagementContextType>(defaultContextState)

export const ManagementContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cleaningEvents, setCleaningEvents] = useState<ICleaning[]>([])
  const [maintenanceEvents, setMaintenanceEvents] = useState<IMaintenance[]>([])
  const id = useParams<{ id: string }>().id?.toString() ?? "";


  const authHeader = useAuthHeader() ?? ""

  const { data: initialCleaningEvents } = useQuery<ICleaning[]>(
    "fetchCleaningEvents",
    () => fetchCleaningEventsByPropertyId(authHeader ?? "", parseInt(id)),
    {
      staleTime: 10000,
    }
  )

  const { data: initialMaintenanceEvents } = useQuery<IMaintenance[]>(
    "fetchMaintenanceEvents",
    () => fetchMaintenanceEventsByPropertyId(authHeader ?? "", parseInt(id)),
    {
      staleTime: 10000,
    }
  )

  useEffect(() => {
    if (initialCleaningEvents && initialMaintenanceEvents) {
      setCleaningEvents(initialCleaningEvents)
      setMaintenanceEvents(initialMaintenanceEvents)
    }
  }, [initialCleaningEvents, initialMaintenanceEvents])

  return (
    <ManagementContext.Provider
      value={{
        cleaningEvents,
        setCleaningEvents,
        maintenanceEvents,
        setMaintenanceEvents,
      }}
    >
      {children}
    </ManagementContext.Provider>
  )
}
