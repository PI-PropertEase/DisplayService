import { useContext, useState } from "react"
import { RxPencil2 } from "react-icons/rx"
import PropertyListBadge from "./PropertyListBadge"
import { PropertyContext } from "../context/PropertyContext"
import { ReservationContext } from "../context/ReservationContext"
import { getPropertiesForPropertyTable } from "../utils/reservationpropertyunifier"
import { IProperty, PropertyStatus } from "../types/PropertyType"
import { Link } from "react-router-dom"

const PropertyListDashboard = () => {
  const { properties } = useContext(PropertyContext)

  const { reservations: reservationData } = useContext(ReservationContext)

  const propertyList: IProperty[] = getPropertiesForPropertyTable(properties, reservationData)

  const [filterStatus, setFilterStatus] = useState<PropertyStatus | "all">("all")


  return (
    <div className="flex flex-col max-h-[32rem] pb-4">
      <div className="flex flex-row font-bold text-2xl items-center">
        <RxPencil2 className="" />
        <span className="ml-2">Properties</span>
        <span className="ml-2 badge text-base bg-[#FAAD1F] dark:bg-orange-800">
          {propertyList.length}
        </span>
      </div>
      <div
        role="tablist"
        className=" flex flex-row flex-wrap mt-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row"
      >
        {[
          { id: "all", label: "All" },
          { id: PropertyStatus.OCCUPIED, label: "Occupied" },
          { id: PropertyStatus.CHECK_IN_SOON, label: "Check-in Soon" },
          { id: PropertyStatus.CHECK_OUT_SOON, label: "Check-out Soon" },
          { id: PropertyStatus.FREE, label: "Free" },
        ].map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            className={`tab flex-grow justify-center content-center border-b-2 rounded-tr-md rounded-tl-md ${
              tab.id === filterStatus ? "bg-secondary border-b-2 border-primary text-black" : ""
            }`}
            onClick={() => setFilterStatus(tab.id as (PropertyStatus | "all"))}
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
            {propertyList.map((property) => {
              if (filterStatus != property.status && filterStatus != "all") return <></>
              return (
                <tr key={property.id}>
                  <Link to={`/property/${property.id}`}>
                    <td>{property.title}</td>
                  </Link>
                  <td>{property.address}</td>
                  <td>
                    <PropertyListBadge text={property.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PropertyListDashboard
