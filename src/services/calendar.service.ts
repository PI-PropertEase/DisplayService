import axios from "axios"
import { ICleaning, IEvent, IMaintenance, IReservation } from "../types/ReservationType"

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
    begin_datetime: parseISODateToUTCDate(r.begin_datetime),
    end_datetime: parseISODateToUTCDate(r.end_datetime),
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
    begin_datetime: parseISODateToUTCDate(r.begin_datetime),
    end_datetime: parseISODateToUTCDate(r.end_datetime),
  }))

  return events
}

// returns ['cleaning', 'maintenance'] and other types that might be added in the future :)
export const fetchManagementTypes = async (authHeader: string): Promise<string[]> => {
  const res = await axios.get<string[]>(`${URL}/management/types`, {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}

export const fetchCleaningEvents = async (authHeader: string): Promise<ICleaning[]> => {
  const res = await axios.get<ICleaning[]>(`${URL}/management/cleaning`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const cleaningEvents: ICleaning[] = res.data.map((r: ICleaning) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime),
    end_datetime: parseISODateToUTCDate(r.end_datetime),
  }))

  return cleaningEvents
}

export const fetchMaintenanceEvents = async (authHeader: string): Promise<IMaintenance[]> => {
  const res = await axios.get<IMaintenance[]>(`${URL}/management/cleaning`, {
    headers: {
      Authorization: authHeader,
    },
  })

  // serialize into right data types
  // Date strings are in the format "YYYY-MM-DDTHH:MM:SS" and need to be converted to Date objects with the correct time zone
  const maintenanceEvents: IMaintenance[] = res.data.map((r: IMaintenance) => ({
    ...r,
    begin_datetime: parseISODateToUTCDate(r.begin_datetime),
    end_datetime: parseISODateToUTCDate(r.end_datetime),
  }))

  return maintenanceEvents
}

// TODO: deal with error case
export const createCleaningEvent = async (authHeader: string, cleaningEvent: ICleaning): Promise<ICleaning> => {
  const res = await axios.post<ICleaning>(`${URL}/management/cleaning`, 
  cleaningEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}

// TODO: deal with error case
export const createMaintenanceEvent = async (authHeader: string, maintenanceEvent: IMaintenance): Promise<ICleaning> => {
  const res = await axios.post<IMaintenance>(`${URL}/management/cleaning`, 
  maintenanceEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


// TODO: deal with error case
export const updateCleaningEvent = async (authHeader: string, cleaningEvent: ICleaning): Promise<ICleaning> => {
  const res = await axios.put<ICleaning>(`${URL}/management/cleaning`, 
  cleaningEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


// TODO: deal with error case
export const updateMaintenanceEvent = async (authHeader: string, maintenanceEvent: IMaintenance): Promise<ICleaning> => {
  const res = await axios.put<IMaintenance>(`${URL}/management/cleaning`, 
  maintenanceEvent,
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


export const deleteCleaningEvent = async (authHeader: string, cleaningEvent: ICleaning): Promise<ICleaning> => {
  const res = await axios.delete<ICleaning>(`${URL}/management/cleaning/${cleaningEvent.id}`, 
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}


export const deleteMaintenanceEvent = async (authHeader: string, maintenanceEvent: IMaintenance): Promise<ICleaning> => {
  const res = await axios.delete<ICleaning>(`${URL}/management/cleaning/${maintenanceEvent.id}`, 
  {
    headers: {
      Authorization: authHeader,
    },
  })

  return res.data
}
