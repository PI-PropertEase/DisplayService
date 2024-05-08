import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { IReservation } from "../types/ReservationType";

interface GenerateKeyModalProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    event: IReservation | undefined;
}

const GenerateKeyModal = ({event, isOpen, setOpen}: GenerateKeyModalProps) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [keycodeInput, setKeycodeInput] = useState<string>("")

    const handleConfirm = () => {
        console.log("hi")
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
                                    setOpen(false)
                                    console.log("clicked me")
                                }}
                            />
                        </div>
                        <hr />
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
                                <button className="ml-2">
                                    <GiPerspectiveDiceSixFacesRandom />
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-5">
                            <span className="text-warning font-bold">WARNING:{"  "}</span>
                            this will send an e-mail with the provided key code for opening the door to the following client:
                            <span className="font-bold">{"  "}{event?.client_email}</span>
                        </div>
                        <div className="flex gap-2 items-center pt-2">
                            <span className="label-text font-bold">Are you sure?</span> 
                            <input type="checkbox" defaultChecked={false} onClick={() => console.log("hello")} className="checkbox" />
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
                            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
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