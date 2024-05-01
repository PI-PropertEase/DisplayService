import { IFetchProperty, IProperty, PropertyStatus } from "../types/PropertyType"
import { IEvent } from "../types/ReservationType"

const insertReservationsInProperty = (
  reservationData: IEvent[],
  propertyData: IFetchProperty[]
): (IFetchProperty & { reservations: IEvent[] })[] | undefined => {
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
  reservationData: IEvent[]
): (IEvent & { property: IFetchProperty | undefined })[] | undefined => {
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

  console.log("RESULT FROM UNIFIED DATA:", unifiedData)
  console.log("RESULT FROM UNIFIED sdgsadgasdgasgsa:", propertyData)
  return unifiedData
}

export const getPropertiesForPropertyTable = (
  propertyData: IFetchProperty[],
  reservationData: IEvent[]
): IProperty[] => {
  // list of properties, with the respective reservations
  const unifiedData = insertReservationsInProperty(reservationData, propertyData) ?? []

  const propertyList: IProperty[] = []

  unifiedData?.forEach((prop) => {
    // if no reservations
    if (prop.reservations.length == 0)
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        status: PropertyStatus.FREE,
        arrival: undefined,
        departure: undefined,
        price: prop.price,
      })

    const currTime = new Date()
    let closestReservation: IEvent | undefined = undefined
    prop.reservations.forEach((r) => {
      if (r.begin_datetime < new Date() && r.end_datetime > new Date()) {
        propertyList.push({
          id: prop._id,
          title: prop.title,
          address: prop.address,
          status: PropertyStatus.OCCUPIED,
          arrival: r.begin_datetime,
          departure: r.end_datetime,
          price: prop.price,
        })
        return
      }
      if (!closestReservation && isReservationUpcoming(r)) closestReservation = r
      if (
        closestReservation &&
        isReservationUpcoming(r) &&
        r.begin_datetime.getTime() - currTime.getTime() <
          closestReservation.begin_datetime.getTime() - currTime.getTime()
      )
        closestReservation = r
    })
    // if the property is not occupied but has some reservations,
    // add it as "Free", but with the closest reservation's dates as arrival and departure time
    if (!propertyList.find((p) => p.id === prop._id)) {
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        status: PropertyStatus.FREE,
        arrival: closestReservation !== undefined ? closestReservation.begin_datetime : undefined,
        departure: closestReservation !== undefined ? closestReservation.end_datetime : undefined,
        price: prop.price,
      })
    }
  })

  return propertyList
}

const isReservationUpcoming = (reservation: IEvent): boolean => {
  const currTime = new Date()
  return reservation.begin_datetime.getTime() - currTime.getTime() > 0
}
