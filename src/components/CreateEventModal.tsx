import { IoCloseOutline } from "react-icons/io5";

const CreateEventModal = ({isOpen, setOpen}: {isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    console.log("isOpen?", isOpen)
    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-smoke z-50" onClick={() => {console.log("Hi")}}></div>
                    <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
                        <div className="modal-box">
                            <div className='flex flex-row items-center justify-between'>
                                <h3 className=" font-medium text-2xl text-center py-2">Create event</h3>
                                <IoCloseOutline className='text-2xl cursor-pointer' onClick={() => setOpen(false)}/>
                            </div>
                            <hr/>
                            <div className="flex flex-col pt-5">
                                <div className="flex flex-row">
                                    Event type:
                                    <div>
                                        <select className="select w-full max-w-xs">
                                            <option selected>Cleaning</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-5 pt-5'>
                                    <div className='flex justify-center'>
                                        <label>
                                            Begin time:
                                        </label>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' placeholder='HH:MM'></input>
                                    </div>
                                    <div className='flex justify-center'>
                                        <label>
                                            End time:
                                        </label>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' placeholder='HH:MM'></input>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="modal-action flex flex-row items-center justify-center gap-2">
                                <button className="btn btn-primary">Confirm</button>
                                <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </dialog>
                </>
            )}
        </>
         
    )
}


export default CreateEventModal;