import { IoCloseOutline } from "react-icons/io5"
import "flatpickr/dist/themes/airbnb.css"
import { useContext } from "react"
import { EventModalContext } from "../context/EventModalContext"

const DeleteEventModal = () => {
  const { deleteModalOpen, setDeleteModalOpen, selectedEvent } = useContext(EventModalContext)

  const handleDelete = () => {
    console.log("delete yes")
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
                  <h3 className=" font-medium text-2xl text-center py-2">Delete TODO </h3>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={() => setDeleteModalOpen(false)}
                  />
                </div>
                <hr />
                <div className="felx flex-wrap mt-4">
                  <p>Are you sure you want to delete the TODO?</p>
                </div>
                <div className="modal-action flex flex-row items-center justify-center gap-2">
                  <button className="btn btn-primary" onClick={handleDelete}>
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
