import { useContext, useState } from "react"
import { ReservationContext } from "../context/ReservationContext"
import { PropertyContext } from "../context/PropertyContext"
import { insertPropertyInReservation } from "../utils/reservationpropertyunifier"
import ReservationStatusBadge from "./ReservationStatusBadge"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"

const ReservationTable = () => {
  const { reservations: reservationData } = useContext(ReservationContext)
  const { properties } = useContext(PropertyContext)
  const reservations = insertPropertyInReservation(properties, reservationData)

  const PAGE_SIZE = 10

  const [paginationNumber, setPaginationNumber] = useState<number>(1)

  const numberOfPages = Math.ceil((reservations?.length ?? 0) / PAGE_SIZE)

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
            <th className="text-center">Client&apos;s Name</th>
            <th className="text-center">Client&apos;s Phone</th>
            <th className="text-center">Arrival</th>
            <th className="text-center">Departure</th>
            <th className="text-center">Reservation Cost</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {(reservations ?? [])
            .slice(PAGE_SIZE * (paginationNumber - 1), PAGE_SIZE * paginationNumber)
            .map((reservation) => {
              return (
                <tr
                  key={reservation.id}
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
                        <div className="font-bold">{reservation.property?.title}</div>
                        <div className="text-sm opacity-50">{reservation.property?.address}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                    data-label="Status"
                  >
                    <ReservationStatusBadge status={reservation.reservation_status} />
                  </td>
                  <td
                    data-label="Client's name"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {reservation.client_name}
                  </td>
                  <td
                    data-label="Client's phone"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {reservation.client_phone}
                  </td>
                  <td
                    data-label="Arrival"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {reservation.begin_datetime.toLocaleString()}
                  </td>
                  <td
                    data-label="Departure"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {reservation.end_datetime.toLocaleString()}
                  </td>
                  <td
                    data-label="Reservation Cost"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel"
                  >
                    {reservation.cost}€
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

export default ReservationTable
