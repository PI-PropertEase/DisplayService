/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react"
import { IEvent, IEventType } from "../types/ReservationType"

interface EventModalContextType {
    modalOpen: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    modalAction: "Edit" | "Create"
    setModalAction: React.Dispatch<React.SetStateAction<"Edit" | "Create">>
    deleteModalOpen: boolean
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedEvent: IEvent | undefined
    setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | undefined>>
    eventType: string
    setEventType: React.Dispatch<React.SetStateAction<IEventType>>
}

const defaultContextState: EventModalContextType = {
    modalOpen: false,
    setModalOpen: () => {},
    modalAction: "Create",
    setModalAction: () => {},
    deleteModalOpen: false,
    setDeleteModalOpen: () => {},
    selectedEvent: undefined,
    setSelectedEvent: () => {},
    eventType: IEventType.CLEANING,
    setEventType: () => {},
}

export const EventModalContext = createContext<EventModalContextType>(defaultContextState)

export const EventModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalAction, setModalAction] = useState<"Edit" | "Create">("Create")
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined)
  const [eventType, setEventType] = useState<IEventType>(IEventType.CLEANING)

  return (
    <EventModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        modalAction,
        setModalAction,
        deleteModalOpen,
        setDeleteModalOpen,
        selectedEvent,
        setSelectedEvent,
        eventType,
        setEventType,

      }}
    >
      {children}
    </EventModalContext.Provider>
  )
}
