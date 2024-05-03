import axios from "axios"
import { ICleaning, IEvent, IMaintenance, IReservation, IUpdateCleaning, IUpdateMaintenance } from "../types/ReservationType"

const URL = "http://localhost/api/CalendarService"

const parseISODateToUTCDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  )
}

export const fetchReservations = async (authHeader: string): Promise<IReservation[]> => {
  const res = await axios.get<IReservation[]>(`${URL}/events/reservation`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const reservations: IReservation[] = res.data.map((r: IReservation) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime.toString()),
    end_datetime: parseISODateToUTCDate(r.end_datetime.toString()),
  }))

  return reservations
}


export const fetchEvents = async (authHeader: string): Promise<IEvent[]> => {
  const res = await axios.get<IEvent[]>(`${URL}/events`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const events: IEvent[] = res.data.map((r: IEvent) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime.toString()),
    end_datetime: parseISODateToUTCDate(r.end_datetime.toString()),
  }))

  return events
}

// returns ['cleaning', 'maintenance'] and other types that might be added in the future :)
export const fetchManagementTypes = async (authHeader: string): Promise<string[]> => {
  const res = await axios.get<string[]>(`${URL}/events/management/types`, {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}

export const fetchCleaningEvents = async (authHeader: string): Promise<ICleaning[]> => {
  const res = await axios.get<ICleaning[]>(`${URL}/events/management/cleaning`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const cleaningEvents: ICleaning[] = res.data.map((r: ICleaning) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime.toString()),
    end_datetime: parseISODateToUTCDate(r.end_datetime.toString()),
  }))

  return cleaningEvents
}

export const fetchMaintenanceEvents = async (authHeader: string): Promise<IMaintenance[]> => {
  const res = await axios.get<IMaintenance[]>(`${URL}/events/management/maintenance`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const maintenanceEvents: IMaintenance[] = res.data.map((r: IMaintenance) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime.toString()),
    end_datetime: parseISODateToUTCDate(r.end_datetime.toString()),
  }))

  return maintenanceEvents
}

// TODO: deal with error case
export const createCleaningEvent = async (authHeader: string, cleaningEvent: ICleaning): Promise<ICleaning> => {
  const res = await axios.post<ICleaning>(`${URL}/events/management/cleaning`, 
  cleaningEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}

// TODO: deal with error case
export const createMaintenanceEvent = async (authHeader: string, maintenanceEvent: IMaintenance): Promise<IMaintenance> => {
  const res = await axios.post<IMaintenance>(`${URL}/events/management/maintenance`, 
  maintenanceEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


// TODO: deal with error case
export const updateCleaningEvent = async (authHeader: string, cleaningEvent: IUpdateCleaning, id: number): Promise<IUpdateCleaning> => {
  const res = await axios.put<IUpdateCleaning>(`${URL}/events/management/cleaning/${id}`, 
  cleaningEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


// TODO: deal with error case
export const updateMaintenanceEvent = async (authHeader: string, maintenanceEvent: IUpdateMaintenance, id: number): Promise<IUpdateMaintenance> => {
  const res = await axios.put<IUpdateMaintenance>(`${URL}/events/management/maintenance/${id}`, 
  maintenanceEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


export const deleteCleaningEvent = async (authHeader: string, cleaningEvent: ICleaning) => {
  await axios.delete(`${URL}/events/management/cleaning/${cleaningEvent.id}`, 
  {
    headers: {
      Authorization: authHeader,
    },
  })
}


export const deleteMaintenanceEvent = async (authHeader: string, maintenanceEvent: IMaintenance) => {
  await axios.delete(`${URL}/events/management/maintenance/${maintenanceEvent.id}`, 
  {
    headers: {
      Authorization: authHeader,
    },
  })
}
