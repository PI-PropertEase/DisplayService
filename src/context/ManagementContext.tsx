/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchCleaningEvents, fetchMaintenanceEvents } from "../services/calendar.service"
import { ICleaning, IMaintenance } from "../types/ReservationType"

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
  const [maintenaceEvents, setMaintenanceEvents] = useState<IMaintenance[]>([])

  const authHeader = useAuthHeader() ?? ""

  const { data: initialCleaningEvents } = useQuery<ICleaning[]>(
    "fetchCleaningEvents",
    () => fetchCleaningEvents(authHeader ?? ""),
    {
      staleTime: 10000,
    }
  )

  const { data: initialMaintenanceEvents } = useQuery<IMaintenance[]>(
    "fetchMaintenanceEvents",
    () => fetchMaintenanceEvents(authHeader ?? ""),
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
        maintenanceEvents: maintenaceEvents,
        setMaintenanceEvents,
      }}
    >
      {children}
    </ManagementContext.Provider>
  )
}
