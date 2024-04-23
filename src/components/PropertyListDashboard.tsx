import React, { useContext, useEffect, useState } from "react"
import { RxPencil2 } from "react-icons/rx"
import PropertyListBadge from "./PropertyListBadge"
import { PropertyContext } from "../context/PropertyContext"
import { IFetchProperty } from "../types/PropertyType"
import { ReservationContext } from "../context/ReservationContext"
import {
  unifyPropertyReservation,
  unifyReservationProperty,
} from "../utils/reservationpropertyunifier"

export interface IProperty {
  id?: number
  title: string
  address: string
  status: "Occupied" | "Free" | "Check-in Soon" | "Check-out Soon"
  arrival: Date
  departure: Date
  price: number
}

const PropertyListDashboard = () => {
  const { properties } = useContext(PropertyContext)

  const { reservations: reservationData } = useContext(ReservationContext)

  const propertyWithReservations = unifyReservationProperty(reservationData, properties)

  const propertyList: IProperty[] = []

  propertyWithReservations?.forEach((property) => {
    property.reservations.forEach((reservation) => {
      if (reservation.begin_datetime < new Date() && reservation.end_datetime > new Date()) {
        propertyList.push({
          id: property._id,
          title: property.title,
          address: property.address,
          status: "Occupied",
          arrival: reservation.begin_datetime,
          departure: reservation.end_datetime,
          price: property.price,
        })
        return;
      }
    })
    if (!propertyList.find((p) => p.id === property._id)) {
      propertyList.push({
        id: property._id,
        title: property.title,
        address: property.address,
        status: "Free",
        arrival: new Date(),
        departure: new Date(),
        price: property.price,
      })
    }
  })

  const [propertyListState, setPropertyListState] = useState<{
    propertyList: IProperty[]
    activeTab: string
  }>({
    propertyList: [...propertyList],
    activeTab: "all_tab",
  })

  useEffect(() => {
    setPropertyListState({
      propertyList: [...propertyList],
      activeTab: "all_tab",
    })
  }, [propertyList])

  const handlePropertyTabSelection = (event: React.MouseEvent<HTMLButtonElement>): void => {
    /* const eventId = event.currentTarget.id;
    let filteredList: IProperty[] = [];

    switch (eventId) {
      case "occupied_tab":
        filteredList = props.propertyList.filter(
          (p: IProperty) => p.status === "Occupied"
        );
        break;
      case "check_in_tab":
        filteredList = props.propertyList.filter(
          (p: IProperty) => p.status === "Check-in Soon"
        );
        break;
      case "check_out_tab":
        filteredList = props.propertyList.filter(
          (p: IProperty) => p.status === "Check-out Soon"
        );
        break;
      case "free_tab":
        filteredList = props.propertyList.filter(
          (p: IProperty) => p.status === "Free"
        );
        break;
      case "all_tab":
      default:
        filteredList = props.propertyList;
        break;
    }

    setPropertyListState({
      propertyList: filteredList,
      activeTab: eventId,
    }); */
  }

  return (
    <div className="flex flex-col max-h-[32rem] pb-4">
      <div className="flex flex-row font-bold text-2xl items-center">
        <RxPencil2 className="" />
        <span className="ml-2">Properties</span>
        <span className="ml-2 badge text-base bg-[#FAAD1F] dark:bg-orange-800">
          {propertyListState.propertyList.length}
        </span>
      </div>
      <div
        role="tablist"
        className=" flex flex-row flex-wrap mt-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row"
      >
        {[
          { id: "all_tab", label: "All" },
          { id: "occupied_tab", label: "Occupied" },
          { id: "check_in_tab", label: "Check-in Soon" },
          { id: "check_out_tab", label: "Check-out Soon" },
          { id: "free_tab", label: "Free" },
        ].map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            className={`tab flex-grow justify-center content-center border-b-2 rounded-tr-md rounded-tl-md ${
              propertyListState.activeTab === tab.id
                ? "bg-secondary border-b-2 border-primary text-black"
                : ""
            }`}
            onClick={handlePropertyTabSelection}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 shadow-md rounded-xl overflow-auto shadow-base-200">
        <table className="table">
          <thead className="sticky top-0 bg-base-100 shadow-sm shadow-base-200">
            <tr>
              <th className="text-accent dark:text-slate-50 text-base">Name</th>
              <th className="text-accent dark:text-slate-50 text-base">Address</th>
              <th className="text-accent dark:text-slate-50 text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {propertyListState.propertyList.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.address}</td>
                <td>
                  <PropertyListBadge text={property.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PropertyListDashboard
