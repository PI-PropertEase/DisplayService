import axios from "axios"
import { ICleaning, IEvent, IEventType, IMaintenance, IReservation, IUpdateCleaning, IUpdateEvent, IUpdateMaintenance } from "../types/ReservationType"

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

export const fetchReservationsByPropertyId = async (authHeader: string, propertyId: string): Promise<IReservation[]> => {
  if (isNaN(parseInt(propertyId)))
    return [];
  const res = await axios.get<IReservation[]>(`${URL}/events/reservation?property_id=${propertyId}`, {
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
  const res = await axios.get<IEvent[]>(`${URL}/events?reservation_status=confirmed`, {
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
export const fetchManagementTypes = async (authHeader: string): Promise<IEventType[]> => {
  const res = await axios.get<IEventType[]>(`${URL}/events/management/types`, {
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

export const fetchCleaningEventsByPropertyId = async (authHeader: string, propertyId: number): Promise<ICleaning[]> => {
  const res = await axios.get<ICleaning[]>(`${URL}/events/management/cleaning?property_id=${propertyId}`, {
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

export const fetchMaintenanceEventsByPropertyId = async (authHeader: string, propertyId: number): Promise<IMaintenance[]> => {
  const res = await axios.get<IMaintenance[]>(`${URL}/events/management/maintenance?property_id=${propertyId}`, {
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
  serializeEvent(cleaningEvent),
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
  serializeEvent(maintenanceEvent),
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
  serializeUpdateEvent(cleaningEvent),
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
  serializeUpdateEvent(maintenanceEvent),
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


// removes timezone information, trust me
const serializeEvent = (event: IEvent): IEvent => {
  return {
    ...event,
    begin_datetime: event.begin_datetime ? event.begin_datetime.toISOString().split('Z')[0] : "",
    end_datetime: event.end_datetime ? event.end_datetime.toISOString().split('Z')[0] : "",
  }
}

// removes timezone information, trust me
const serializeUpdateEvent = (event: IUpdateEvent): IUpdateEvent => {
  return {
    ...event,
    begin_datetime: event.begin_datetime ? new Date(event.begin_datetime?.getTime() - event.begin_datetime?.getTimezoneOffset() * 60 * 1000).toISOString().split('Z')[0] : "",
    end_datetime: event.end_datetime ? new Date(event.end_datetime?.getTime() - event.end_datetime?.getTimezoneOffset() * 60 * 1000).toISOString().split('Z')[0] : "",
  }
}

export const sendKeyEmail = async (authHeader: string, key: string, reservation: IReservation) : Promise<void> => {
  await axios.post(`${URL}/events/reservation/${reservation.id}/email_key`, 
  {
    "key": key,
  },
  {
    headers: {
      Authorization: authHeader,
    },
  })
}