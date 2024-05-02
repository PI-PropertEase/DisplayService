import { useContext, useState } from "react"
import { ManagementContext } from "../context/ManagementContext"
import { IEventType } from "../types/ReservationType";
import { FaArrowLeft, FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { insertPropertyInEvent } from "../utils/reservationpropertyunifier";
import { PropertyContext } from "../context/PropertyContext";
import { EventModalContext } from "../context/EventModalContext";

const MaintenanceTable = () => {

  const { maintenanceEvents } = useContext(ManagementContext);  
  const { properties } = useContext(PropertyContext)

  const {setModalOpen, setModalAction, setDeleteModalOpen, setSelectedEvent} = useContext(EventModalContext);

  const maintenanceEventsData = insertPropertyInEvent(properties, maintenanceEvents)

  const PAGE_SIZE = 10

  const [paginationNumber, setPaginationNumber] = useState<number>(1)

  const numberOfPages = Math.ceil((maintenanceEvents?.length ?? 0) / PAGE_SIZE)

  let paginationArray: number[] = [] // [1,2, ..., n] where n = number of pages

  for (let i = 1; i <= numberOfPages; i++) {
    paginationArray.push(i)
  }

  // only show buttons for pages whose number is within 2 of current page
  // example: current page is 2 -> only show buttons for pages [1, 2, 3, 4]
  paginationArray = paginationArray.filter((n) => !(Math.abs(paginationNumber - n) > 2))


  return (
    <>
      <table className="table">
        {/* head */}
        <thead className="bg-secondary dark:bg-[#242424] text-black dark:text-white">
          <tr className="max-[760px]:block max-[760px]:clip-out">
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name and Address</th>
            <th>Status</th>
            <th className="text-center">Arrival</th>
            <th className="text-center">Departure</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {(maintenanceEventsData ?? [])
            .slice(PAGE_SIZE * (paginationNumber - 1), PAGE_SIZE * paginationNumber)
            .map((maintenanceEvent) => {
              return (
                <tr
                  key={maintenanceEvent.id}
                  className="max-[760px]:block max-[760px]:border-[#eee] max-[760px]:dark:border-[#223] max-[760px]:border-t-8 max-[760px]:border-b-0 max-[760px]:mb-2 max-[760px]:p-2"
                >
                  <th className="max-[760px]:clip-out">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td
                    data-label="Address"
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    <div className="lg:flex items-center gap-3">
                      <div>
                        <div className="font-bold">{maintenanceEvent.property?.title}</div>
                        <div className="text-sm opacity-50">{maintenanceEvent.property?.address}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    data-label="Arrival"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {maintenanceEvent.begin_datetime.toLocaleString()}
                  </td>
                  <td
                    data-label="Departure"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {maintenanceEvent.end_datetime.toLocaleString()}
                  </td>
                  <td
                    data-label="Edit"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    <button
                      className="max-[760px]:ml-auto"
                      onClick={() => {
                        setModalAction("Edit")
                        setModalOpen(true)
                      }}
                    >
                      <GrEdit />
                    </button>
                  </td>
                  <td
                    data-label="Delete"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel"
                  >
                    <button
                      className="max-[760px]:ml-auto"
                      onClick={() => {
                        setSelectedEvent(maintenanceEvent) // TODO: the type on this is messed up
                        setDeleteModalOpen(true)
                      }}
                      disabled={maintenanceEvent.type === IEventType.CLEANING}
                    >
                      <FaRegTrashAlt
                        style={{ color: maintenanceEvent.type === IEventType.RESERVATION ? "gray" : "" }}
                      />
                    </button>
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
    </>
  )
}

export default MaintenanceTable
