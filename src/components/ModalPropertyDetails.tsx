import { useQuery } from 'react-query';
import { IModalData } from '../routes/PropertyDetails';
import { useQueryClient } from 'react-query';
import { IoCloseOutline } from "react-icons/io5";

export default function ModalPropertyDetails() {

    const {data: modalData} = useQuery<IModalData>('modalData')
    
    const queryClient = useQueryClient();

    const handleModalClose = () => {
        const updatedModalData = { 
            ...modalData, 
            isOpen: false, 
            content: modalData?.content ?? '',
            type: modalData?.type ?? '',
        };
        queryClient.setQueryData<IModalData>('modalData', updatedModalData);
    };

    return (
        <>
        {modalData && modalData.isOpen && (
            <>
            <div className="fixed inset-0 bg-smoke z-50"></div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle p-8" open>
                <div className="modal-box">
                    <div className='flex flex-row items-center justify-between'>
                        <h3 className=" font-medium text-2xl text-center py-2">Change {modalData.type}</h3>
                        <IoCloseOutline className='text-2xl cursor-pointer' onClick={handleModalClose}/>
                    </div>
                    <hr/>
                    <div className='felx flex-wrap mt-4'>
                        <div className=' '>
                            {modalData.type === ("Description" || "Cancellation Policy" || "Notes") ? 
                            <textarea  className="border border-smoke h-32 p-2 rounded-xl mt-2 w-full text-accent bg-base-100" defaultValue={typeof modalData.content === "string"  ? modalData.content : ""} /> : 
                            modalData.type.includes("Bedroom") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'object' && 'number_beds' in modalData.content && (
                                    <div className=''>  
                                        <p className='font-light'>Number of beds: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content.number_beds}/>
                                        <p className='font-light'>Type: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content.type.join(', ')}/>
                                    </div>
                                )}
                            </div> :
                            modalData.type.includes("Contact") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'object' && 'name' in modalData.content && (
                                    <div className=''>  
                                        <p className='font-light'>Name: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content.name}/>
                                        <p className='font-light'>Number: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content.phone}/>
                                        <p className='font-light'>Email: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content.email}/>
                                    </div>
                                )}
                            </div> :
                            modalData.type.includes("Bedrooom") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'string' && (
                                    <div className=''>  
                                        <p className='font-light'>Items: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={modalData.content}/>
                                    </div>
                                )}
                            </div> :
                            <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' defaultValue={typeof modalData.content === "string" || typeof modalData.content === "number"? modalData.content : ""}/>
                            }
                            
                        </div>
                    </div>
                    <div className="modal-action justify-center">
                        <button className="btn btn-primary" onClick={handleModalClose}>Save</button>
                    </div>
                </div>
            </dialog>
            </>
        )}
        
        </>
       
    );
}
