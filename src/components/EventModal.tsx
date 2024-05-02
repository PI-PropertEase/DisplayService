import "flatpickr/dist/themes/airbnb.css"
import { useContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import Flatpickr from "react-flatpickr"
import { IoCloseOutline } from "react-icons/io5"
import { useQuery } from "react-query"
import {
  createCleaningEvent,
  createMaintenanceEvent,
  fetchManagementTypes,
  updateCleaningEvent,
  updateMaintenanceEvent,
} from "../services/calendar.service"
import { Dropdown } from "./Dropdown"
import { useParams } from "react-router-dom"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { ICleaning, IEventType, IMaintenance } from "../types/ReservationType"
import { IUser } from "../types/UserType"
import { EventModalContext } from "../context/EventModalContext"

const EventModal = () => {
  const {modalOpen, setModalOpen, modalAction, selectedEvent} = useContext(EventModalContext);
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  console.log("selectedEvent", selectedEvent)

  const token = useAuthHeader() ?? ""
  const [showError, setShowError] = useState<boolean>(false)

  const [beginDate, setBeginDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [managementType, setManagementType] = useState<string | null>("")
  const [managementTypes, setManagementTypes] = useState<string[]>([])

  const propertyId = parseInt(useParams<{ id: string }>().id ?? "-1")
  const userEmail = useAuthUser<IUser>()?.email

  const { data: fetchedManagementTypes } = useQuery<string[]>(
    "fetchManagementTypes",
    () => fetchManagementTypes(token),
    {
      staleTime: 10000,
    }
  )

  useEffect(() => {
    if (fetchedManagementTypes) {
      setManagementTypes(fetchedManagementTypes)
    }
  }, [fetchedManagementTypes])

  const handleConfirm = async () => {
    if (managementType !== "cleaning" && managementType !== "maintenance") return
    if (beginDate >= endDate) {
      setShowError(true)
      return
    }
    setShowError(false)
    if (modalAction === "Create") {
      const event = {
        property_id: propertyId,
        owner_email: userEmail ?? "",
        begin_datetime: beginDate,
        end_datetime: endDate,
        type: managementType === "cleaning" ? IEventType.CLEANING : IEventType.MAINTENANCE,
      }
      if (managementType === "cleaning") {
        await createCleaningEvent(token, event as ICleaning)
      } else if (managementType === "maintenance") {
        await createMaintenanceEvent(token, event as IMaintenance)
      }
    } else if (modalAction === "Edit") {
      const event = {
        // TODO: do this using details from the table
        property_id: propertyId,
        owner_email: userEmail ?? "",
        begin_datetime: beginDate,
        end_datetime: endDate,
        type: managementType === "cleaning" ? IEventType.CLEANING : IEventType.MAINTENANCE,
      }
      if (managementType === "cleaning") {
        await updateCleaningEvent(token, event as ICleaning)
      } else if (managementType === "maintenance") {
        await updateMaintenanceEvent(token, event as IMaintenance)
      }
    }
    setModalOpen(false)
  }

  return (
    <>
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-smoke z-50"></div>
          <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
            <div className="modal-box">
              <div className="flex flex-row items-center justify-between">
                <h3 className=" font-medium text-2xl text-center py-2">{modalAction} event</h3>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => setModalOpen(false)}
                />
              </div>
              <hr />
              <div className="flex flex-col pt-5 gap-2">
                {modalAction === "Create" && (
                  <div className="flex flex-row items-center">
                    Event type:
                    <div className="mr-3">
                      <Dropdown
                        options={managementTypes}
                        placeholder="Select event type"
                        onSelect={(option) => {
                          setManagementType(option)
                        }}
                      />
                    </div>
                  </div>
                )}
                <label>Begin time:</label>
                <Flatpickr
                  data-enable-time
                  value={beginDate}
                  onChange={([date]) => {
                    setBeginDate(date)
                  }}
                  className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent"
                  options={{
                    minDate,
                  }}
                />
                <label>End time:</label>
                <Flatpickr
                  data-enable-time
                  value={endDate}
                  onChange={([date]) => {
                    setEndDate(date)
                  }}
                  className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent"
                  options={{
                    minDate,
                  }}
                />
              </div>
              {showError && (
                <div role="alert" className="alert alert-error mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! Invalid time interval. Begin time should be before end time.</span>
                  <button className="btn btn-sm btn-error" onClick={() => setShowError(false)}>
                    X
                  </button>
                </div>
              )}
              <div className="modal-action flex flex-row items-center justify-center gap-2">
                <button className="btn btn-primary" onClick={handleConfirm as () => void}>
                  Confirm
                </button>
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  )
}

export default EventModal
