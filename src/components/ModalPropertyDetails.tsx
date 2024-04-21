import { useQuery } from 'react-query';
import { IModalData } from '../routes/PropertyDetails';
import { useQueryClient } from 'react-query';
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef } from 'react';
import { Amenity, IFetchProperty, IUpdateProperty } from '../types/PropertyType';
import { updateProperty } from '../services/Property.service';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useParams } from 'react-router-dom';

export interface IAlerts {
    type: string;
    message: string;
    active: boolean;

}

export default function ModalPropertyDetails() {

    const authHeader = useAuthHeader() ?? "";

    const {data: modalData} = useQuery<IModalData>('modalData')

    const {data: alertData} = useQuery<IAlerts>('alertData')
    
    const queryClient = useQueryClient();

    const stringInput = useRef<HTMLInputElement>(null);
    const textareaInput = useRef<HTMLTextAreaElement>(null);
    const numBedsInput = useRef<HTMLInputElement>(null);
    const typeBedsInput = useRef<HTMLInputElement>(null);
    const nameContactInput = useRef<HTMLInputElement>(null);
    const phoneContactInput = useRef<HTMLInputElement>(null);
    const itemsInput = useRef<HTMLInputElement>(null);

    const updatedPropertyDetails: IFetchProperty = queryClient.getQueryData('property')!;
    const propertyId = useParams<{id: string}>().id;
    
    const handleModalClose = () => {
        const updatedModalData = { 
            ...modalData, 
            isOpen: false, 
            content: modalData?.content ?? '',
            type: modalData?.type ?? '',
        };
        queryClient.setQueryData<IModalData>('modalData', updatedModalData);
    };

    const handleSave = async () => {

        let notAllowed: string[] = [];
        const allNotAllowed: string[] = [];
        let allowed: string[] = [];
        const allAllowed: string[] = [];

        switch (modalData?.type) {
            case "Title":
                if (stringInput.current?.value) {
                    updatedPropertyDetails.title = stringInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Title',
                        message: '',
                        active: false
                    });
                }
                else {
                    queryClient.setQueryData('alertData', {
                        type: 'Title',
                        message: 'Title cannot be empty',
                        active: true
                    });
                    return;
                } 
                break;
            case "Address":
                if (stringInput.current?.value && stringInput.current?.value.length > 3) {
                    updatedPropertyDetails.address = stringInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Address',
                        message: '',
                        active: false
                    });
                }
                else {
                    queryClient.setQueryData('alertData', {
                        type: 'Address',
                        message: 'Address must be at least 4 characters long',
                        active: true
                    });
                    return;
                }
                break;
            case "Description":
                if (textareaInput.current?.value && textareaInput.current?.value.length > 3) {
                    updatedPropertyDetails.description = textareaInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Description',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'Description',
                        message: 'Description must be at least 4 characters long',
                        active: true
                    });
                    return;
                }
                break;
            case "Number of guests":
                if (stringInput.current?.value && Number(stringInput.current?.value) > 0){
                    updatedPropertyDetails.number_guests = Number(stringInput.current?.value);
                    queryClient.setQueryData('alertData', {
                        type: 'Number of guests',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'Number of guests',
                        message: 'Number of guests must be greater than 0',
                        active: true
                    });
                    return;
                }
                break;
            case "Area (m²)":
                if (stringInput.current?.value && Number(stringInput.current?.value) > 0){
                    updatedPropertyDetails.square_meters = Number(stringInput.current?.value);
                    queryClient.setQueryData('alertData', {
                        type: 'Area (m²)',
                        message: '',
                        active: false
                    });
                } else
                {
                    queryClient.setQueryData('alertData', {
                        type: 'Area (m²)',
                        message: 'Area must be greater than 0',
                        active: true
                    });
                    return;
                }
                break;
            case "Price (per night €)":
                if (stringInput.current?.value && Number(stringInput.current?.value) > 0){
                    updatedPropertyDetails.price = Number(stringInput.current?.value);
                    queryClient.setQueryData('alertData', {
                        type: 'Price (per night €)',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'Price (per night €)',
                        message: 'Price must be greater than 0',
                        active: true
                    });
                    return;
                }
                break;
            case "Amenities":
                updatedPropertyDetails.amenities = stringInput.current?.value.split(',').map(item => item.trim() as Amenity) ?? [];
                break;
            case "Notes":
                updatedPropertyDetails.additional_info = textareaInput.current?.value ?? '';
                break;
            case "Cancellation Policy":
                updatedPropertyDetails.cancellation_policy = textareaInput.current?.value ?? '';
                break;
            case "Check In":
                if ( !stringInput.current?.value || !/^\d{2}:\d{2}H - \d{2}:\d{2}H$/.test(stringInput.current?.value)
                    || Number(stringInput.current?.value.split(' - ')[0].split(':')[0]) > 23 || Number(stringInput.current?.value.split(' - ')[1].split(':')[0]) > 23 
                    || Number(stringInput.current?.value.split(' - ')[0].split(':')[1]) > 59 || Number(stringInput.current?.value.split(' - ')[1].split(':')[1]) > 59
                    || stringInput.current?.value.split(' - ')[0].split(':')[0] >= stringInput.current?.value.split(' - ')[1].split(':')[0]
                    ){
                    queryClient.setQueryData('alertData', {
                        type: 'Check In',
                        message: 'Invalid time format, must be hh:mmH - hh:mmH and begin time must be before end time',
                        active: true
                    });
                    return;
                }
                else {
                    updatedPropertyDetails.house_rules.check_in.begin_time = stringInput.current?.value.split(' - ')[0];
                    updatedPropertyDetails.house_rules.check_in.end_time = stringInput.current?.value.split(' - ')[1];
                    queryClient.setQueryData('alertData', {
                        type: 'Check In',
                        message: '',
                        active: false
                    });
                }
                
                break;
            case "Check Out":
                if ( !stringInput.current?.value || !/^\d{2}:\d{2}H - \d{2}:\d{2}H$/.test(stringInput.current?.value)
                    || Number(stringInput.current?.value.split(' - ')[0].split(':')[0]) > 23 || Number(stringInput.current?.value.split(' - ')[1].split(':')[0]) > 23 
                    || Number(stringInput.current?.value.split(' - ')[0].split(':')[1]) > 59 || Number(stringInput.current?.value.split(' - ')[1].split(':')[1]) > 59
                    || stringInput.current?.value.split(' - ')[0].split(':')[0] >= stringInput.current?.value.split(' - ')[1].split(':')[0]
                    ){
                    queryClient.setQueryData('alertData', {
                        type: 'Check Out',
                        message: 'Invalid time format, must be hh:mmH - hh:mmH and begin time must be before end time',
                        active: true
                    });
                    return;
                }else {
                    updatedPropertyDetails.house_rules.check_out.begin_time = stringInput.current?.value.split(' - ')[0];
                    updatedPropertyDetails.house_rules.check_out.end_time = stringInput.current?.value.split(' - ')[1];
                    queryClient.setQueryData('alertData', {
                        type: 'Check Out',
                        message: '',
                        active: false
                    });
                }
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
                if (stringInput.current?.value && itemsInput.current?.value){
                    updatedPropertyDetails.bathrooms.set(stringInput.current?.value, itemsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== ""));
                    queryClient.setQueryData('alertData', {
                        type: 'New Bathroom',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'New Bathroom',
                        message: 'ID and Items cannot be empty',
                        active: true
                    });
                    return;
                }
                break;
            case "New Bedroom":
                if (stringInput.current?.value && numBedsInput.current?.value && typeBedsInput.current?.value){
                    updatedPropertyDetails.bedrooms[stringInput.current?.value] = {
                        number_beds: Number(numBedsInput.current?.value),
                        type: typeBedsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "")
                    };
                    queryClient.setQueryData('alertData', {
                        type: 'New Bedroom',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'New Bedroom',
                        message: 'ID, Number of beds and Type cannot be empty',
                        active: true
                    });
                    return;
                }
                break;
            case "New Contact":
                if (nameContactInput.current?.value && ( phoneContactInput.current?.value)){
                    updatedPropertyDetails.contacts.push({
                        name: nameContactInput.current?.value,
                        phone_number: phoneContactInput.current?.value,
                        
                    });
                    queryClient.setQueryData('alertData', {
                        type: 'New Contact',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'New Contact',
                        message: 'Name and at least one contact information must be filled',
                        active: true
                    });
                    return;
                }
                break;
            default:
                if (modalData?.type.includes("Bedroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    if (id && updatedPropertyDetails.bedrooms[id] && numBedsInput.current?.value && typeBedsInput.current?.value) {
                        updatedPropertyDetails.bedrooms[id] = {
                            number_beds: Number(numBedsInput.current?.value),
                            type: typeBedsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "")
                        };
                        queryClient.setQueryData('alertData', {
                            type: 'Bedroom',
                            message: '',
                            active: false
                        });
                    } else {
                        queryClient.setQueryData('alertData', {
                            type: 'Bedroom',
                            message: 'Number of beds and Type cannot be empty',
                            active: true
                        });
                        return;
                    }
                } else if (modalData?.type.includes("Bathroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    if (id && itemsInput.current?.value) {
                        updatedPropertyDetails.bathrooms.set(id, itemsInput.current?.value.split(',').map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== ""));
                        queryClient.setQueryData('alertData', {
                            type: 'Bathroom',
                            message: '',
                            active: false
                        });
                    } else {
                        queryClient.setQueryData('alertData', {
                            type: 'Bathroom',
                            message: 'Items cannot be empty',
                            active: true
                        });
                        return;
                    }
             
                } else if (modalData?.type.includes("Contact")) {
                    const index = modalData.content?.index as number;
                    console.log("test2", nameContactInput.current?.value)
                    console.log("test3", phoneContactInput.current?.value)
                    if (index !== undefined && nameContactInput.current?.value && (phoneContactInput.current?.value)){
                        updatedPropertyDetails.contacts[index] = {
                            name: nameContactInput.current?.value,
                            phone_number: phoneContactInput.current?.value,
                        };
                        queryClient.setQueryData('alertData', {
                            type: 'Contact',
                            message: '',
                            active: false
                        });
                    } else {
                        queryClient.setQueryData('alertData', {
                            type: 'Contact',
                            message: 'Name and at least one contact information must be filled',
                            active: true
                        });
                        return;
                    
                    }
                }
                break;
            
        }
        await queryClient.invalidateQueries('property')
        queryClient.setQueryData('property', updatedPropertyDetails);
        await updateProperty(propertyId ?? "", updatedPropertyDetails, authHeader);
        handleModalClose();
    }

    return (
        <>
        {modalData && modalData.isOpen && (
            <>
            <div className="fixed inset-0 bg-smoke z-50"></div>
            <dialog id="my_modal_5" className="modal sm:modal-middle p-8" open>
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
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={phoneContactInput} defaultValue={modalData.content.phone_number}/>
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
                            {alertData?.active &&(
                                <div role="alert" className="alert alert-error mt-4"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Error! {alertData.message}.</span>
                                </div>
                            )}
                            
                            
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
