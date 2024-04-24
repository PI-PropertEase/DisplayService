import { IProperty } from "../components/PropertyListDashboard"
import { IFetchProperty } from "../types/PropertyType"
import { IReservation } from "../types/ReservationType"

export const unifyReservationProperty = (
  reservationData: IReservation[],
  propertyData: IFetchProperty[]
) => {
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

export const unifyPropertyReservation = (
  propertyData: IFetchProperty[],
  reservationData: IReservation[]
) => {
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

export const getPropertiesForPropertyTable = (
  propertyData: IFetchProperty[],
  reservationData: IReservation[]
): IProperty[] => {
  // list of properties, with the respective reservations
  const unifiedData = unifyReservationProperty(reservationData, propertyData) ?? [];

  const propertyList: IProperty[] = []

  console.log("unified data", unifiedData)

  unifiedData?.forEach((prop) => {
    // if no reservations
    if (prop.reservations.length == 0)
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        status: "Free",
        arrival: undefined,
        departure: undefined,
        price: prop.price,
      })

    const currTime = new Date();
    let closestReservation: IReservation | undefined = undefined;
    prop.reservations.forEach((r) => {
      if (r.begin_datetime < new Date() && r.end_datetime > new Date()) {
        propertyList.push({
          id: prop._id,
          title: prop.title,
          address: prop.address,
          status: "Occupied",
          arrival: r.begin_datetime,
          departure: r.end_datetime,
          price: prop.price,
        })
        return
      }
      if (!closestReservation && isReservationUpcoming(r))
        closestReservation = r;
      if (closestReservation && isReservationUpcoming(r) && r.begin_datetime.getTime() - currTime.getTime() < closestReservation.begin_datetime.getTime() - currTime.getTime())
        closestReservation = r;
    })
    // if the property is not occupied but has some reservations,
    // add it as "Free", but with the closest reservation's dates as arrival and departure time 
    if (!propertyList.find((p) => p.id === prop._id)) {
      propertyList.push({
        id: prop._id,
        title: prop.title,
        address: prop.address,
        status: "Free",
        arrival: closestReservation !== undefined ? closestReservation.begin_datetime : undefined,
        departure: closestReservation !== undefined ? closestReservation.end_datetime : undefined,
        price: prop.price,
      })
    }
  })

  return propertyList;
}


const isReservationUpcoming = (reservation: IReservation): boolean => {
  const currTime = new Date();
  return reservation.begin_datetime.getTime() - currTime.getTime() > 0;
}
