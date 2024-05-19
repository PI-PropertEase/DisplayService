import { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoDiceOutline } from "react-icons/io5";
import { IReservation } from "../types/ReservationType";
import { sendKeyEmail } from "../services/calendar.service";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { PropertyDetailsToastContext } from "../context/PropertyDetailsToastContext";

interface GenerateKeyModalProps {
    isOpen: boolean
    setOpen: (value: boolean) => void
    reservation: IReservation | undefined
}

const GenerateKeyModal = ({reservation, isOpen, setOpen}: GenerateKeyModalProps) => {
    const authHeader = useAuthHeader() ?? ''
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [keycodeInput, setKeycodeInput] = useState<string>("")
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {setIsShowing, setToastMessage} = useContext(PropertyDetailsToastContext);

    const handleConfirm = () => {
        if (keycodeInput == "") {
            setErrorMessage("Include a keycode to be sent to the client.")
            setShowError(true)
            return
        }
        if (!confirmation) {
            setErrorMessage("You must confirm to send an email to the client with the keycode.")
            setShowError(true)
            return
        }
        if (!reservation) return
        setShowError(false)
        setIsLoading(true)
        sendKeyEmail(authHeader, keycodeInput, reservation).then(() => {
            handleClose()
            setIsShowing(true)
            setToastMessage(`Successfully sent email with keycode to open door to ${reservation.client_email}!`)
            setTimeout(() => {
                setToastMessage("")
                setIsShowing(false)
            }, 5000)
        }).catch((_reason) => {
            setErrorMessage("Failed to send email.")
            setShowError(true)
        }).finally(() => setIsLoading(false))
    }

    const handleClose = () => {
        setOpen(false)
        setShowError(false)
        setErrorMessage("")
        setKeycodeInput("")
        setConfirmation(false)
    }

    const randomizeKeyCode = () => {
        // generates string between '000000' and '999999'
        setKeycodeInput(Math.floor(Math.random() * 999999).toString().padStart(6, '0'))
    }

    return (
        
            <>
              {isOpen && (
                <>
                  <div className="fixed inset-0 bg-smoke z-50"></div>
                  <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
                    <div className="modal-box">
                        <div className="flex flex-row items-center justify-between">
                            <h3 className=" font-medium text-2xl text-center py-2">Send key code for opening the door</h3>
                            <IoCloseOutline
                                className="text-2xl cursor-pointer"
                                onClick={() => {
                                    handleClose()
                                }}
                            />
                        </div>
                        <hr />
                        <div className="pt-5">
                            <span className="text-warning font-bold">WARNING:{"  "}</span>
                            this will send an e-mail with the provided key code for opening the door to the following client:
                            <span className="font-bold">{"  "}{reservation?.client_email}</span>
                        </div>
                        <div className="flex flex-col pt-5 gap-2">
                            <label>
                                Keycode to open door:
                            </label>
                            <div className="flex flex-row justify-start items-center">
                                <input
                                    className="bg-base-200 p-2 rounded-xl w-[90%] text-accent"
                                    value={keycodeInput}
                                    onChange={(e) => setKeycodeInput(e.target.value)}
                                />
                                <div className="tooltip" data-tip="Randomize">
                                <button className="ml-2" onClick={() => randomizeKeyCode()}>
                                    <IoDiceOutline size={30} />
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center pt-2">
                            <span className="label-text font-bold">Are you sure?</span> 
                            <input type="checkbox" checked={confirmation} onChange={() => setConfirmation(!confirmation)} className="checkbox" />
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
                            <span>Error: {errorMessage}</span>
                            <button className="btn btn-sm btn-error" onClick={() => setShowError(false)}>
                                X
                            </button>
                            </div>
                        )}
                        <div className="modal-action flex flex-row items-center justify-center gap-2">
                            <button className={`btn btn-primary ${isLoading ? "btn-disabled" : ""}`} onClick={() => {if (!isLoading) handleConfirm()}}>
                                {isLoading && (
                                    <span className="loading loading-spinner"></span>
                                )}
                                Confirm
                            </button>
                            <button className={`btn btn-secondary ${isLoading ? "btn-disabled" : ""}`} onClick={() => {if (!isLoading) handleClose()}}>
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

export default GenerateKeyModal;