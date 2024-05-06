import { IoCloseOutline } from "react-icons/io5"
import "flatpickr/dist/themes/airbnb.css"
import { useContext, useState } from "react"
import { EventModalContext } from "../context/EventModalContext"
import { IEventType } from "../types/ReservationType"
import { deleteCleaningEvent, deleteMaintenanceEvent } from "../services/calendar.service"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { isAxiosError } from "axios"
import { useQueryClient } from "react-query"

const DeleteEventModal = () => {
  const { deleteModalOpen, setDeleteModalOpen, selectedEvent } = useContext(EventModalContext)

  const authHeader = useAuthHeader() ?? "";

  const queryClient = useQueryClient()

  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const showErrorMessage = (message: string) => {
    setErrorMessage(message)
    setShowError(true)
  }

  const handleDelete = async () => {
    setShowError(false)
    try {
      if (selectedEvent?.type === IEventType.CLEANING) {
        await deleteCleaningEvent(authHeader, selectedEvent) 
        await queryClient.invalidateQueries("fetchCleaningEvents")
      } else if (selectedEvent?.type === IEventType.MAINTENANCE) {
        await deleteMaintenanceEvent(authHeader, selectedEvent)
        await queryClient.invalidateQueries("fetchMaintenanceEvents")
      }
      else {
        showErrorMessage(`Error! Invalid event type - ${selectedEvent?.type}`)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showErrorMessage(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (error.response?.data?.detail as string) ?? "An error occurred. Please try again."
        )
      } else {
        showErrorMessage("An error occurred. Please try again.")
      }
      return
    }
    setDeleteModalOpen(false)
  }

  return (
    <>
      {deleteModalOpen && (
        <>
          <>
            <div className="fixed inset-0 bg-smoke z-50"></div>
            <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
              <div className="modal-box">
                <div className="flex flex-row items-center justify-between">
                  <h3 className=" font-medium text-2xl text-center py-2">Delete {selectedEvent?.type} event</h3>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={() => setDeleteModalOpen(false)}
                  />
                </div>
                <hr />
                <div className="felx flex-wrap mt-4">
                  <p>Are you sure you want to delete this {selectedEvent?.type} event from <span className="font-bold">{selectedEvent?.begin_datetime.toLocaleString()}</span> to <span className="font-bold">{selectedEvent?.end_datetime.toLocaleString()}</span>?</p>
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
                  <button 
                    className="btn btn-primary" 
                    onClick={
                      () => {
                        void (async () => {
                          await handleDelete();
                        })();
                      }}>
                    Yes
                  </button>
                  <button className="btn btn-secondary" onClick={() => setDeleteModalOpen(false)}>
                    No
                  </button>
                </div>
              </div>
            </dialog>
          </>
        </>
      )}
    </>
  )
}

export default DeleteEventModal
