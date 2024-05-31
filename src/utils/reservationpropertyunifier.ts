import { IFetchProperty, IProperty, PropertyStatus } from "../types/PropertyType"
import { IEvent, IReservation, ReservationStatus } from "../types/ReservationType"

const insertReservationsInProperty = (
  reservationData: IReservation[],
  propertyData: IFetchProperty[]
): (IFetchProperty & { reservations: IReservation[] })[] | undefined => {
  if (!reservationData || !propertyData) {
    return undefined
  }

  const unifiedData = propertyData.map((property) => {
    const reservations = reservationData.filter(
      (reservation) => reservation.property_id == property._id
    )
    return {
      ...property,
      reservations,
    }
  })

  return unifiedData
}

export const insertPropertyInReservation = (
  propertyData: IFetchProperty[],
  reservationData: IReservation[]
): (IReservation & { property: IFetchProperty | undefined })[] | undefined => {
  if (!reservationData || !propertyData) {
    return undefined
  }

  const unifiedData = reservationData.map((reservation) => {
    const property = propertyData.find((property) => property._id == reservation.property_id)
    return {
      ...reservation,
      property,
    }
  })

  return unifiedData
}

export const insertPropertyInEvent = (
  propertyData: IFetchProperty[],
  eventData: IEvent[]
): (IEvent & { property: IFetchProperty | undefined })[] | undefined => {
  if (!eventData || !propertyData) {
    return undefined
  }

  const unifiedData = eventData.map((event) => {
    const property = propertyData.find((property) => property._id == event.property_id)
    return {
      ...event,
      property,
    }
  })

  return unifiedData
}

export const getPropertiesForPropertyTable = (
  propertyData: IFetchProperty[],
  reservationData: IReservation[]
): IProperty[] => {
  // list of properties, with the respective reservations
  const unifiedData = insertReservationsInProperty(reservationData, propertyData) ?? []

  const propertyList: IProperty[] = []

  unifiedData?.forEach((prop) => {
    // if no reservations, set property status as free and return
    if (prop.reservations.length == 0) {
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        status: PropertyStatus.FREE,
        services: prop.services,
        arrival: undefined,
        departure: undefined,
        price: prop.price,
      })
      return;
    }
    
    // if there are reservations, get the closest one 
    const currTime = new Date()
    let closestReservation: IReservation | undefined = undefined
    prop.reservations.forEach((r) => {
      if (r.reservation_status !== ReservationStatus.CONFIRMED) return;
      // if reservation is ongoing, status is either CHECK-OUT SOON (end_datetime is within 1 day reach)
      // or OCCUPIED, if the previous condition is not met
      if (r.begin_datetime < new Date() && r.end_datetime > new Date()) {
        if (isDateWithinNextDay(r.end_datetime)) {
          propertyList.push({
            id: prop._id,
            title: prop.title,
            address: prop.address,
            services: prop.services,
            status: PropertyStatus.CHECK_OUT_SOON,
            arrival: r.begin_datetime,
            departure: r.end_datetime,
            price: prop.price,
          })
          return
        }
        propertyList.push({
          id: prop._id,
          title: prop.title,
          address: prop.address,
          services: prop.services,
          status: PropertyStatus.OCCUPIED,
          arrival: r.begin_datetime,
          departure: r.end_datetime,
          price: prop.price,
        })
        return
      }
      if (!closestReservation && isEventUpcoming(r)) closestReservation = r
      if (
        closestReservation &&
        isEventUpcoming(r) &&
        r.begin_datetime.getTime() - currTime.getTime() <
          closestReservation.begin_datetime.getTime() - currTime.getTime()
      )
        closestReservation = r
    })
    // if the property is not yet in propertyList after iterating all reservations, then it either:
    //    1. has no reservations in the future, only the past -> arrival/dep undefined
    //    2. has no current reservations, but has reservations in the future -> arrival/dep based on closestReservation
    // its status will be either CHECK-IN SOON, if closestReservation is within 1 day reach
    // or FREE, if closestReservation is not within 1 day reach
    if (!propertyList.find((p) => p.id === prop._id)) {
      if (closestReservation && isDateWithinNextDay((closestReservation as IReservation).begin_datetime)) {
        propertyList.push({
          id: prop._id,
          title: prop.title,
          address: prop.address,
          services: prop.services,
          status: PropertyStatus.CHECK_IN_SOON,
          arrival: (closestReservation as IReservation).begin_datetime,
          departure: (closestReservation as IReservation).end_datetime,
          price: prop.price,
        })
        return
      }
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        services: prop.services,
        status: PropertyStatus.FREE,
        arrival: closestReservation !== undefined ? (closestReservation as IReservation).begin_datetime : undefined,
        departure: closestReservation !== undefined ? (closestReservation as IReservation).end_datetime : undefined,
        price: prop.price,
      })
    }
  })

  return propertyList
}

const isEventUpcoming = (event: IEvent | IReservation): boolean => {
  const currTime = new Date()
  return event.begin_datetime.getTime() - currTime.getTime() > 0
}

const isDateWithinNextDay = (date: Date): boolean => {
  const currTime = new Date();
  const millisecondsFromDateTime = date.getTime() - currTime.getTime();
  // returns true if event begin_time is within 1 day worth of milliseconds (86400 * 1000)
  // from starting
  return millisecondsFromDateTime < 86400 * 1000 && millisecondsFromDateTime > 0;
}
