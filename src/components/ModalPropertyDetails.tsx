import { useQuery } from 'react-query';
import { IModalData } from '../routes/PropertyDetails';
import { useQueryClient } from 'react-query';
import { IoCloseOutline } from "react-icons/io5";
import { useRef } from 'react';
import { IPropertyDetails } from '../main';

export default function ModalPropertyDetails() {

    const {data: modalData} = useQuery<IModalData>('modalData')
    
    const queryClient = useQueryClient();

    const stringInput = useRef<HTMLInputElement>(null);
    const textareaInput = useRef<HTMLTextAreaElement>(null);
    const numBedsInput = useRef<HTMLInputElement>(null);
    const typeBedsInput = useRef<HTMLInputElement>(null);
    const nameContactInput = useRef<HTMLInputElement>(null);
    const phoneContactInput = useRef<HTMLInputElement>(null);
    const emailContactInput = useRef<HTMLInputElement>(null);
    const itemsInput = useRef<HTMLInputElement>(null);
    


    const handleModalClose = () => {
        const updatedModalData = { 
            ...modalData, 
            isOpen: false, 
            content: modalData?.content ?? '',
            type: modalData?.type ?? '',
        };
        queryClient.setQueryData<IModalData>('modalData', updatedModalData);
    };

    const handleSave = () => {
        const updatedPropertyDetails: IPropertyDetails = queryClient.getQueryData('propertyDetails')!;

        let notAllowed: string[] = [];
        const allNotAllowed: string[] = [];
        let allowed: string[] = [];
        const allAllowed: string[] = [];

        console.log(modalData?.type);

        switch (modalData?.type) {
            case "Title":
                updatedPropertyDetails.title = stringInput.current?.value ?? ''; 
                break;
            case "Address":
                updatedPropertyDetails.address = stringInput.current?.value ?? '';
                break;
            case "Description":
                updatedPropertyDetails.description = textareaInput.current?.value ?? '';
                break;
            case "Number of guests":
                updatedPropertyDetails.number_guests = Number(stringInput.current?.value);
                break;
            case "Area (m²)":
                updatedPropertyDetails.square_meters = Number(stringInput.current?.value);
                break;
            case "Price (per night €)":
                updatedPropertyDetails.price_per_night = Number(stringInput.current?.value);
                break;
            case "Amenities":
                updatedPropertyDetails.amenities = stringInput.current?.value.split(',').map(item => item.trim()) ?? [];
                break;
            case "Notes":
                updatedPropertyDetails.notes = textareaInput.current?.value ?? '';
                break;
            case "Cancellation Policy":
                updatedPropertyDetails.cancellation_policy = textareaInput.current?.value ?? '';
                break;
            case "Check In":
                updatedPropertyDetails.house_rules.check_in.begin_time = stringInput.current?.value.split(' - ')[0] ?? '';
                updatedPropertyDetails.house_rules.check_in.end_time = stringInput.current?.value.split(' - ')[1] ?? '';
                break;
            case "Check Out":
                updatedPropertyDetails.house_rules.check_out.begin_time = stringInput.current?.value.split(' - ')[0] ?? '';
                updatedPropertyDetails.house_rules.check_out.end_time = stringInput.current?.value.split(' - ')[1] ?? '';
                break;
            case "Not Allowed":
                notAllowed = stringInput.current?.value.split(',').map(item => item.trim().toLowerCase()) ?? [];
                for (const key in updatedPropertyDetails.house_rules) {
                    if (typeof (updatedPropertyDetails.house_rules)[key] === 'boolean' && !(updatedPropertyDetails.house_rules)[key]) {
                        allNotAllowed.push(key);
                        if (notAllowed.includes(key)) {
                            (updatedPropertyDetails.house_rules)[key] = false;
                        } else {
                            (updatedPropertyDetails.house_rules)[key] = true;
                        }
                    }
                }

                notAllowed.forEach(item => {
                    if (!allNotAllowed.includes(item)) {
                        updatedPropertyDetails.house_rules[item] = false;
                    }
                }
                );
                break;
            case "Allowed":
                allowed = stringInput.current?.value.split(',').map(item => item.trim().toLowerCase()) ?? [];
                for (const key in updatedPropertyDetails.house_rules) {
                    if (typeof (updatedPropertyDetails.house_rules)[key] === 'boolean' && (updatedPropertyDetails.house_rules)[key]) {
                        allAllowed.push(key);
                        if (allowed.includes(key)) {
                            (updatedPropertyDetails.house_rules)[key] = true;
                        } else {
                            (updatedPropertyDetails.house_rules)[key] = false;
                        }
                    }
                }

                allowed.forEach(item => {
                    if (!allAllowed.includes(item)) {
                        updatedPropertyDetails.house_rules[item] = true;
                    }
                }
                );
                break;
            case "New Bathroom":
                updatedPropertyDetails.bathrooms.set(stringInput.current?.value ?? "", itemsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "") ?? []);
                break;
            case "New Bedroom":
                updatedPropertyDetails.bedrooms[stringInput.current?.value ?? ""] = {
                    number_beds: Number(numBedsInput.current?.value),
                    type: typeBedsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "") ?? []
                };
                break;
            case "New Contact":
                updatedPropertyDetails.contact.push({
                    id: updatedPropertyDetails.contact.length + 1,
                    name: nameContactInput.current?.value ?? '',
                    phone: Number(phoneContactInput.current?.value),
                    email: emailContactInput.current?.value ?? ''
                });
                break;
            default:
                if (modalData?.type.includes("Bedroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    updatedPropertyDetails.bedrooms[id] = {
                        number_beds: Number(numBedsInput.current?.value),
                        type: typeBedsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "") ?? []
                    };
                } else if (modalData?.type.includes("Bathroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    updatedPropertyDetails.bathrooms.set(id, itemsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "") ?? []);    
             
                } else if (modalData?.type.includes("Contact")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    const existingContactIndex = updatedPropertyDetails.contact.findIndex(contact => contact.id === Number(id));
                    if (existingContactIndex !== -1) {
                        updatedPropertyDetails.contact[existingContactIndex] = {
                            id: Number(id),
                            name: nameContactInput.current?.value ?? '',
                            phone: Number(phoneContactInput.current?.value),
                            email: emailContactInput.current?.value ?? ''
                        };
                    }
                }
                break;
            
        }

        queryClient.setQueryData('propertyDetails', updatedPropertyDetails);
        handleModalClose();
    }

    return (
        <>
        {modalData && modalData.isOpen && (
            <>
            <div className="fixed inset-0 bg-smoke z-50"></div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle p-8" open>
                <div className="modal-box">
                    <div className='flex flex-row items-center justify-between'>
                        <h3 className=" font-medium text-2xl text-center py-2">{modalData.type.includes("New") ? `Add ${modalData.type}` : `Change ${modalData.type}` } </h3>
                        <IoCloseOutline className='text-2xl cursor-pointer' onClick={handleModalClose}/>
                    </div>
                    <hr/>
                    <div className='felx flex-wrap mt-4'>
                        <div className=' '>
                            {modalData.type === ("Description" || "Cancellation Policy" || "Notes") ? 
                            <textarea  className="border border-smoke h-32 p-2 rounded-xl mt-2 w-full text-accent bg-base-100" ref={textareaInput} defaultValue={typeof modalData.content === "string"  ? modalData.content : ""} /> : 
                            modalData.type.includes("Bedroom") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'object' && 'number_beds' in modalData.content && (
                                    <div className=''>  
                                        {modalData.type === "New Bedroom" && (
                                            <>
                                             <p className='font-light'>ID: </p>
                                             <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={stringInput}/>
                                            </>
                                        )}
                                        <p className='font-light'>Number of beds: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={numBedsInput} defaultValue={modalData.content.number_beds}/>
                                        <p className='font-light'>Type: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={typeBedsInput} defaultValue={modalData.content.type.join(', ')}/>
                                    </div>
                                )}
                            </div> :
                            modalData.type.includes("Contact") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'object' && 'name' in modalData.content && (
                                    <div className=''>  
                                        <p className='font-light'>Name: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={nameContactInput} defaultValue={modalData.content.name}/>
                                        <p className='font-light'>Number: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={phoneContactInput} defaultValue={modalData.content.phone}/>
                                        <p className='font-light'>Email: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={emailContactInput} defaultValue={modalData.content.email}/>
                                    </div>
                                )}
                            </div> :
                            modalData.type.includes("Bathroom") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'string' && (
                                    <div className=''>  
                                        {modalData.type === "New Bathroom" && (
                                            <>
                                             <p className='font-light'>ID: </p>
                                             <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={stringInput}/>
                                             </>
                                        )}
                                       
                                        <p className='font-light'>Items: </p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={itemsInput} defaultValue={modalData.content}/>
                                    </div>
                                )}
                            </div> :
                            <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={stringInput} defaultValue={typeof modalData.content === "string" || typeof modalData.content === "number"? modalData.content : ""}/>
                            }
                            
                        </div>
                    </div>
                    <div className="modal-action justify-center">
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </dialog>
            </>
        )}
        
        </>
       
    );
}
