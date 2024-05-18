import { useContext, useState } from "react"
import PropertyListBadge from "./PropertyListBadge"
import { BsBoxArrowUpRight } from "react-icons/bs"
import { FaArrowLeft, FaArrowRight, FaRegTrashAlt } from "react-icons/fa"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"
import { Link } from "react-router-dom"
import { PropertyContext } from "../context/PropertyContext"
import { ReservationContext } from "../context/ReservationContext"
import { getPropertiesForPropertyTable } from "../utils/reservationpropertyunifier"
import { IProperty } from "../types/PropertyType"
import { ServiceEnum } from "../types/UserType"
import { Dropdown } from "./Dropdown"

const PropertyTable = () => {
  const PAGE_SIZE = 10

  const { properties: propertyData } = useContext(PropertyContext)

  const { reservations: reservationData } = useContext(ReservationContext)

  let propertyList: IProperty[] = getPropertiesForPropertyTable(propertyData, reservationData);
  
  const [paginationNumber, setPaginationNumber] = useState<number>(1)

  // if undefined, shows all properties without filtering
  const [filterService, setFilterService] = useState<ServiceEnum | undefined>(undefined);

  if (filterService)
    propertyList = propertyList.filter((prop) => prop.services.some(service => service == filterService))

  const numberOfPages = Math.ceil((propertyList?.length ?? 0) / PAGE_SIZE)

  let paginationArray: number[] = [] // [1,2, ..., n] where n = number of pages

  for (let i = 1; i <= numberOfPages; i++) {
    paginationArray.push(i)
  }

  // only show buttons for pages whose number is within 2 of current page
  // example: current page is 2 -> only show buttons for pages [1, 2, 3, 4]
  paginationArray = paginationArray.filter((n) => !(Math.abs(paginationNumber - n) > 2))

  if (propertyData.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col w-[100%] h-[100%] text-center text-4xl gap-4">
        You do not have any properties imported into our system.<br/>Connect to a supported external service you have properties listed in!
        <Link to={"/integrations"}>
          <button className="btn btn-primary w-20">
            Connect now
          </button>
        </Link> 
      </div>
    )
  }

  return (
    <div className="overflow-auto h-full">
      <div className="h-[5rem] flex flex-row items-center justify-center pt-1">
        <div className="pl-6 text-xl text-center">
          Properties
          <span className="ml-3 badge text-[0.75rem] bg-secondary text-[#FDA882] dark:bg-orange-900 dark:text-secondary border-none">
            {propertyList?.length ?? 0} Properties
          </span>
        </div>
        <div className="mr-0 ml-auto pr-6">
          <Dropdown 
            placeholder="Filter by Service"
            options={[ServiceEnum.ZOOKING, ServiceEnum.EARTHSTAYIN, ServiceEnum.CLICKANDGO]}
            onSelect={(service: string | null) => {
              if (service) setFilterService(service as ServiceEnum);
              else setFilterService(undefined);
            }}
          />
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead className="bg-secondary dark:bg-[#242424] text-black dark:text-white">
          <tr className="max-[760px]:block max-[760px]:clip-out">
            <th>
            </th>
            <th>Name and Address</th>
            <th>Status</th>
            <th className="text-center">From services</th>
            <th className="text-center">Arrival/Upcoming Arrival</th>
            <th className="text-center">Departure/Upcoming Departure</th>
            <th className="text-center">Current Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {(propertyList ?? [])
            .slice(PAGE_SIZE * (paginationNumber - 1), PAGE_SIZE * paginationNumber)
            .map((property: IProperty) => {
              return (
                <tr
                  key={property.id}
                  className="max-[760px]:block max-[760px]:border-[#eee] max-[760px]:dark:border-[#223] max-[760px]:border-t-8 max-[760px]:border-b-0 max-[760px]:mb-2 max-[760px]:p-2"
                >
                  <th className="max-[760px]:clip-out">
                  </th>
                  <td
                    data-label="Address"
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    <div className="lg:flex items-center gap-3">
                      <Link to={`../property/${property.id}`}>
                        <div>
                          <div className="font-bold">{property.title}</div>
                          <div className="text-sm opacity-50">{property.address}</div>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                    data-label="Status"
                  >
                    <PropertyListBadge text={property.status} />
                  </td>
                  <td
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                    data-label="Services"
                  >
                    {/* capitalize and then join with comma */}
                    {property.services.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")}
                  </td>
                  <td
                    data-label="Arrival"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.arrival?.toLocaleString() ?? "-"}
                  </td>
                  <td
                    data-label="Departure"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.departure?.toLocaleString() ?? "-"}
                  </td>
                  <td
                    data-label="Price"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.price}€
                  </td>
                  <td
                    data-label="More Details"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel"
                  >
                    <Link to={`../property/${property.id}`} className="max-[760px]:ml-auto">
                      <BsBoxArrowUpRight />
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/* Table Footer */}
      <div className="w-full p-6">
        <div className="flex">
          <button
            className="btn btn-outline flex-1"
            onClick={() => {
              if (paginationNumber > 1) setPaginationNumber(paginationNumber - 1)
            }}
          >
            <FaArrowLeft /> Previous
          </button>
          <div className="join flex-[16] justify-center content-center">
            <button
              className={`join-item btn bg-white dark:bg-transparent ${
                paginationNumber === 1 ? "btn-disabled" : ""
              }`}
              onClick={() => setPaginationNumber(1)}
            >
              {" "}
              <MdKeyboardDoubleArrowLeft />
            </button>
            {paginationArray.map((num) => {
              return (
                <button
                  key={num}
                  className={`join-item btn  ${
                    paginationNumber === num
                      ? "bg-secondary dark:bg-orange-800"
                      : "bg-white dark:bg-transparent"
                  }`}
                  onClick={() => setPaginationNumber(num)}
                >
                  {num}
                </button>
              )
            })}
            <button
              className={`join-item btn bg-white dark:bg-transparent ${
                paginationNumber === numberOfPages ? "btn-disabled" : ""
              }`}
              onClick={() => setPaginationNumber(numberOfPages)}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
          <button
            className="btn btn-outline flex-1"
            onClick={() => {
              if (paginationNumber < numberOfPages) setPaginationNumber(paginationNumber + 1)
            }}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyTable
