import { IoCloseOutline } from "react-icons/io5";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr"
import { useState } from "react";

const EventModal = ({isOpen, setOpen, action}: {isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, action: "Edit" | "Create"
}) => {
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);

    const [showError, setShowError] = useState<boolean>(false);

    const [beginDate, setBeginDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const handleConfirm = () => {
        if (beginDate >= endDate) {
            setShowError(true)
            return
        }
        setShowError(false)
        console.log("valid dates, good job")
    }

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-smoke z-50"></div>
                    <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
                        <div className="modal-box">
                            <div className='flex flex-row items-center justify-between'>
                                <h3 className=" font-medium text-2xl text-center py-2">{action} event</h3>
                                <IoCloseOutline className='text-2xl cursor-pointer' onClick={() => setOpen(false)}/>
                            </div>
                            <hr/>
                            <div className="flex flex-col pt-5 gap-2">
                                {action === "Create" && (
                                    <div className="flex flex-row">
                                    Event type:
                                    <div>
                                        <select className="select w-full max-w-xs">
                                            <option selected>Cleaning</option>
                                        </select>
                                    </div>
                                </div>
                                )}
                                <label>
                                    Begin time:
                                </label>
                                <Flatpickr
                                    data-enable-time
                                    value={beginDate}
                                    onChange={([date]) => {
                                        setBeginDate(date)
                                    }}
                                    className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent"
                                    options={{
                                        minDate
                                    }}
                                />
                                <label>
                                    End time:
                                </label>
                                <Flatpickr
                                    data-enable-time
                                    value={endDate}
                                    onChange={([date]) => {
                                        setEndDate(date)
                                    }}
                                    className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent"
                                    options={{
                                        minDate
                                    }}
                                />
                            </div>
                            {showError && (
                                <div role="alert" className="alert alert-error mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Error! Invalid time interval. Begin time should be before end time.</span>
                                    <button className="btn btn-sm btn-error" onClick={() => setShowError(false)}>X</button>
                                </div>
                            )}
                            <div className="modal-action flex flex-row items-center justify-center gap-2">
                                <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                                <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </dialog>
                </>
            )}
        </>
         
    )
}


export default EventModal;