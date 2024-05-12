import { isAxiosError } from "axios"
import "flatpickr/dist/themes/airbnb.css"
import { useContext, useEffect, useState } from "react"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import Flatpickr from "react-flatpickr"
import { IoCloseOutline } from "react-icons/io5"
import { useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { EventModalContext } from "../context/EventModalContext"
import {
  createCleaningEvent,
  createMaintenanceEvent,
  fetchManagementTypes,
  updateCleaningEvent,
  updateMaintenanceEvent,
} from "../services/calendar.service"
import {
  ICleaning,
  IEventType,
  IMaintenance,
  IUpdateCleaning,
  IUpdateEvent,
  IUpdateMaintenance,
} from "../types/ReservationType"
import { IUser } from "../types/UserType"
import { Dropdown } from "./Dropdown"

const EventModal = () => {
  const { modalOpen, setModalOpen, modalAction, selectedEvent } = useContext(EventModalContext)
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  const token = useAuthHeader() ?? ""
  const [showError, setShowError] = useState<boolean>(false)

  const [beginDate, setBeginDate] = useState<Date>(selectedEvent?.begin_datetime ?? new Date())
  const [endDate, setEndDate] = useState<Date>(selectedEvent?.end_datetime ?? new Date())

  const [managementType, setManagementType] = useState<IEventType | null>(null)
  const [managementTypes, setManagementTypes] = useState<IEventType[]>([])

  const [errorMessage, setErrorMessage] = useState<string>("")
  const [nameInput, setNameInput] = useState<string>("")

  const propertyId = parseInt(useParams<{ id: string }>().id ?? "-1")
  const userEmail = useAuthUser<IUser>()?.email

  const queryClient = useQueryClient()

  const { data: fetchedManagementTypes } = useQuery<IEventType[]>(
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

  useEffect(() => {
    if (selectedEvent) {
      setBeginDate(selectedEvent.begin_datetime)
      setEndDate(selectedEvent.end_datetime)
      setManagementType(selectedEvent.type)
      setNameInput(
        selectedEvent.type === IEventType.CLEANING
          ? (selectedEvent as ICleaning).worker_name
          : selectedEvent.type === IEventType.MAINTENANCE
          ? (selectedEvent as IMaintenance).company_name
          : ""
      )
    }
  }, [selectedEvent])

  const showErrorMessage = (message: string) => {
    setErrorMessage(message)
    setShowError(true)
  }

  const handleConfirm = async () => {
    if (beginDate >= endDate) {
      showErrorMessage("Error! Invalid time interval. Begin time should be before end time.")
      return
    }
    if (nameInput === "") {
      showErrorMessage("Error! Please input name.")
      return
    }
    setShowError(false)

    try {
      if (modalAction === "Create") {
        if (managementType !== IEventType.CLEANING && managementType !== IEventType.MAINTENANCE) {
          showErrorMessage("Error! Please select an event type.")
          return
        }

        const event = {
          property_id: propertyId,
          owner_email: userEmail ?? "",
          begin_datetime: new Date(beginDate?.getTime() - beginDate?.getTimezoneOffset() * 60 * 1000),
          end_datetime: new Date(endDate?.getTime() - endDate?.getTimezoneOffset() * 60 * 1000),
          type:
            managementType === IEventType.CLEANING ? IEventType.CLEANING : IEventType.MAINTENANCE,
        }

        if (managementType === IEventType.CLEANING) {
          (event as ICleaning).worker_name = nameInput
          await createCleaningEvent(token, event as ICleaning)
          await queryClient.invalidateQueries("fetchCleaningEvents")
        } else if (managementType === IEventType.MAINTENANCE) {
          (event as IMaintenance).company_name = nameInput
          await createMaintenanceEvent(token, event as IMaintenance)
          await queryClient.invalidateQueries("fetchMaintenanceEvents")
        }
      } else if (modalAction === "Edit") {
        const event: IUpdateEvent = {
          begin_datetime: beginDate,
          end_datetime: endDate,
        }

        if (selectedEvent?.type === IEventType.CLEANING) {
          if (nameInput !== (selectedEvent as ICleaning).worker_name) {
            (event as IUpdateCleaning).worker_name = nameInput; 
          }
          await updateCleaningEvent(token, event as IUpdateCleaning, selectedEvent?.id ?? -1)
          await queryClient.invalidateQueries("fetchCleaningEvents")
        } else if (selectedEvent?.type === IEventType.MAINTENANCE) {
          if (nameInput !== (selectedEvent as IMaintenance).company_name) {
            (event as IUpdateMaintenance).company_name = nameInput; 
          }
          await updateMaintenanceEvent(token, event as IUpdateMaintenance, selectedEvent?.id ?? -1)
          await queryClient.invalidateQueries("fetchMaintenanceEvents")
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showErrorMessage(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (error.response?.data?.detail as string) ?? "An error occurred. Try again."
        )
      } else {
        showErrorMessage("An error occurred. Please try again.")
      }
      console.log("error em questao", error)
      return
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
                    <div className="ml-3 mr-3">
                      <Dropdown
                        options={managementTypes}
                        placeholder="Select event type"
                        onSelect={(option) => {
                          setManagementType(option as IEventType)
                        }}
                      />
                    </div>
                  </div>
                )}
                {managementType !== null && (
                  <>
                    <label>
                      {managementType === IEventType.CLEANING
                        ? "Worker Name:"
                        : managementType === IEventType.MAINTENANCE
                        ? "Company Name:"
                        : ""}
                    </label>
                    <input
                      className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                    <label>Begin time:</label>
                  </>
                )}
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
                  <span>{errorMessage}</span>
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
