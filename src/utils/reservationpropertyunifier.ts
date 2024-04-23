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
