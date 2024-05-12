import { useQuery } from 'react-query';
import { IModalData } from '../routes/PropertyDetails';
import { useQueryClient } from 'react-query';
import { IoCloseOutline, IoTrashOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import { Amenity, BathroomFixture, Bed, BedType, IFetchProperty } from '../types/PropertyType';
import { fetchAmenities, fetchBathroomFixtures, fetchBedTypes, updateProperty } from '../services/Property.service';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useParams } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs';
import { isValidPhoneNumber } from 'libphonenumber-js';

export interface IAlerts {
    type: string;
    message: string;
    active: boolean;

}

export default function ModalPropertyDetails() {
    const authHeader = useAuthHeader() ?? "";
    const id = useParams<{ id: string }>().id?.toString() ?? "";

    const {data: modalData} = useQuery<IModalData>('modalData')

    const {data: alertData} = useQuery<IAlerts>('alertData')
    
    const queryClient = useQueryClient();

    const stringInput = useRef<HTMLInputElement>(null);

    const beginTimeInput = useRef<HTMLInputElement>(null); // check-in/check-out/rest-time
    const endTimeInput = useRef<HTMLInputElement>(null);

    const textareaInput = useRef<HTMLTextAreaElement>(null);
    const nameContactInput = useRef<HTMLInputElement>(null);
    const phoneContactInput = useRef<HTMLInputElement>(null);
    const updatedPropertyDetails: IFetchProperty = queryClient.getQueryData(`property${id}`)!;

    const [afterCommission, setAfterCommission] = useState<boolean>( typeof modalData?.content === "object" && "after_commision" in modalData.content ?  modalData.content.after_commission : false);

    // for house rules, example: { "smoking": false, "allow_pets": true}
    const [ruleCheckboxes, setRuleCheckboxes] = useState<Record<string, boolean> | object>({});

    const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

    const [selectedFixtures, setSelectedFixtures] = useState<BathroomFixture[]>([]);

    const [beds, setBeds] = useState<Bed[]>([]);
    
    const { data: availableAmenities } = useQuery("amenities", () => fetchAmenities(authHeader));

    const { data: bathroomFixtures } = useQuery("bathroom_fixtures", () => fetchBathroomFixtures(authHeader));

    const { data: bedTypes } = useQuery("bed_types", () => fetchBedTypes(authHeader));



    useEffect(() => {
        if (modalData?.type === "House Rules")
            setRuleCheckboxes(modalData.content as Record<string, boolean>)
        if (modalData?.type === "Price (per night €)")
            setAfterCommission((modalData.content as {price: number; after_commission: boolean;}).after_commission)
            
    }, [modalData]);

    useEffect(() => {
        if (availableAmenities && modalData?.type === "Amenities")
            setSelectedAmenities(
                availableAmenities.filter((amenity) => (modalData.content as Amenity[]).includes(amenity))
            )
    }, [availableAmenities, modalData])

    useEffect(() => {
        if (bathroomFixtures && modalData?.type.includes("Bathroom"))
            setSelectedFixtures(
                bathroomFixtures.filter((fixture) => (modalData.content as BathroomFixture[]).includes(fixture))
            )
    }, [bathroomFixtures, modalData])

    useEffect(() => {
        if (modalData?.type.includes("Bedroom")) {
            setBeds(modalData.content as Bed[]);
        }
    }, [modalData])

    const isValidTimeslotRegex = (timeslot: string) => {
        return /^(2[0-3]|[01][0-9]):([0-5][0-9])$/.test(timeslot);
    }


    const isValidInterval = (beginTimeslot: string, endTimeslot: string) => {
        // check regex HH:MM
        if (!isValidTimeslotRegex(beginTimeslot) || !isValidTimeslotRegex(endTimeslot))
            return false;

        const beginHour = Number(beginTimeslot.split(":")[0]);
        const beginMinute = Number(beginTimeslot.split(":")[1]);
        const endHour = Number(endTimeslot.split(":")[0]);
        const endMinute = Number(endTimeslot.split(":")[1]);
        if (beginHour == endHour && beginMinute >= endMinute) return false;

        return true;
    }

    const isBedsValid = () => {
        if (!beds || !bedTypes) return false;

        if (beds.length == 0) return false;

        if (hasDuplicateBedType())
            return false;

        if (beds.some((bed) => bed.number_beds == 0))
            return false;

        return true;
    }

    const hasDuplicateBedType = (): boolean => {
        if (!bedTypes) return false;

        return bedTypes.map((currType) => {
            if (beds.filter((bed) => bed.type == currType).length > 1) return true;
            return false;
        }).some((v) => v == true);
    }

    const handleModalClose = () => {
        const updatedModalData = { 
            ...modalData, 
            isOpen: false, 
            content: modalData?.content ?? '',
            type: modalData?.type ?? '',
        };
        queryClient.setQueryData('alertData', {
            type: '',
            message: '',
            active: false
        });        
        queryClient.setQueryData<IModalData>('modalData', updatedModalData);
    };

    const handleRuleCheckbox = (rule: string) => {
        setRuleCheckboxes(prevState => ({
            ...prevState,
            [rule]: !(prevState as Record<string, boolean>)[rule] // toggle
        }));
    }

    const handleAmenitiesCheckbox = (event: React.ChangeEvent<HTMLInputElement>, amenity: Amenity) => {
        if (event.target.checked)
            setSelectedAmenities(prevState => [...prevState, amenity])
        else 
            setSelectedAmenities(prevState => prevState.filter((a) => a != amenity))
    }

    const handleFixturesCheckbox = (event: React.ChangeEvent<HTMLInputElement>, fixture: BathroomFixture) => {
        if (event.target.checked)
            setSelectedFixtures(prevState => [...prevState, fixture])
        else 
            setSelectedFixtures(prevState => prevState.filter((f) => f != fixture))
    }

    const handleChangeBedType = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        setBeds(prevState => prevState.map((bed, i) => {
            if (i === index)
                return {
                    ...bed,
                    type: event.target.value as BedType
                };
            return bed;
        }))
    }

    const handleChangeNumberBeds = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setBeds((prevState) => 
            prevState.map((bed, idx) => {
                if (idx === index) {
                    const val: number = event.target.value !== "" ? Number(event.target.value) : 0;
                    return {
                        ...bed,
                        number_beds: val
                    }
                }
                    
                    
                return bed;
            })
        )
    };

    const addNewBed = () => {
        setBeds((prevState) => {
            const newState = [...prevState];
            newState.push({
                number_beds: 0,
                type: BedType.SINGLE
            })
            return newState;
        })
    }

    const removeBed = (index: number) => {
        setBeds((prevState) => prevState.filter((_bed, i) => index !== i));
    }
    

    const handleSave = () => {
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
            case "Price (per night €)": {
                
                const price = Number(stringInput.current?.value);
                if (stringInput.current?.value && price > 0) {
                    updatedPropertyDetails.price = Number(stringInput.current?.value);
                    updatedPropertyDetails.after_commission = afterCommission;
                    queryClient.setQueryData('alertData', {
                        type: 'Price (per night €)',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'Price (per night €)',
                        message: 'Price must be greater than 0€',
                        active: true
                    });
                    return;
                }
                break;
            }
            case "Amenities": {
                updatedPropertyDetails.amenities = selectedAmenities;
                break;
            }
            case "Additional Info":
                updatedPropertyDetails.additional_info = textareaInput.current?.value ?? '';
                break;
            case "Cancellation Policy":
                updatedPropertyDetails.cancellation_policy = textareaInput.current?.value ?? '';
                break;
            case "Check In":
                if (endTimeInput.current?.value && beginTimeInput.current?.value 
                    && isValidInterval(beginTimeInput.current?.value, endTimeInput.current?.value))
                {
                    updatedPropertyDetails.house_rules.check_in.begin_time = beginTimeInput.current?.value;
                    updatedPropertyDetails.house_rules.check_in.end_time = endTimeInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Check In',
                        message: '',
                        active: false
                    });
                    
                }
                else {
                    queryClient.setQueryData('alertData', {
                        type: 'Check In',
                        message: 'Invalid time format, must be HH:MM - HH:MM and Begin Time must be before End Time. Example: 10:00 - 18:00',
                        active: true
                    });
                    return;
                }
                
                break;
            case "Check Out":
                if (endTimeInput.current?.value && beginTimeInput.current?.value 
                    && isValidInterval(beginTimeInput.current?.value, endTimeInput.current?.value))
                {
                    updatedPropertyDetails.house_rules.check_out.begin_time = beginTimeInput.current?.value;
                    updatedPropertyDetails.house_rules.check_out.end_time = endTimeInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Check Out',
                        message: '',
                        active: false
                    });
                    
                }
                else {
                    queryClient.setQueryData('alertData', {
                        type: 'Check Out',
                        message: 'Invalid time format, must be HH:MM - HH:MM and Begin Time must be before End Time. Example: 10:00 - 18:00',
                        active: true
                    });
                    return;
                }
                
                break;
            case "Rest Time":
                if (endTimeInput.current?.value && beginTimeInput.current?.value 
                    && isValidTimeslotRegex(beginTimeInput.current.value) && isValidTimeslotRegex(endTimeInput.current.value))
                {
                    updatedPropertyDetails.house_rules.rest_time.begin_time = beginTimeInput.current?.value;
                    updatedPropertyDetails.house_rules.rest_time.end_time = endTimeInput.current?.value;
                    queryClient.setQueryData('alertData', {
                        type: 'Rest Time',
                        message: '',
                        active: false
                    });
                    
                }
                else {
                    queryClient.setQueryData('alertData', {
                        type: 'Rest Time',
                        message: 'Invalid time format, must be HH:MM - HH:MM. Example: 22:00 - 08:00',
                        active: true
                    });
                    return;
                }
                break;
            case "House Rules":
                // update all boolean rules with values from checkboxes
                for (const rule in ruleCheckboxes)
                    updatedPropertyDetails.house_rules[rule] = ruleCheckboxes[rule]; 
                break;
            case "New Bathroom":
                if (stringInput.current?.value && selectedFixtures.length > 0) {
                    const bathroomName = stringInput.current?.value;
                    updatedPropertyDetails.bathrooms[bathroomName] = {
                        fixtures: selectedFixtures
                    }
                    queryClient.setQueryData('alertData', {
                        type: 'New Bathroom',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'New Bathroom',
                        message: 'Bathroom name and fixtures cannot be empty',
                        active: true
                    });
                    return;
                }
                break;
            case "New Bedroom":
                if (stringInput.current?.value && isBedsValid()){
                    updatedPropertyDetails.bedrooms[stringInput.current?.value] = {
                        beds: beds
                    };
                    queryClient.setQueryData('alertData', {
                        type: 'New Bedroom',
                        message: '',
                        active: false
                    });
                } else {
                    queryClient.setQueryData('alertData', {
                        type: 'New Bedroom',
                        message: 'Bedroom name cannot be empty, number of beds must not be 0, and bed types cannot be duplicated',
                        active: true
                    });
                    return;
                }
                break;
            case "New Contact":
                if (nameContactInput.current?.value && phoneContactInput.current?.value && isValidPhoneNumber(phoneContactInput.current.value, "PT")){
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
                        message: 'Name and phone number information must be filled and be valid in Portugal. Example: +351 910 000 000',
                        active: true
                    });
                    return;
                }
                break;
            default:
                if (modalData?.type.includes("Bedroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    if (id && updatedPropertyDetails.bedrooms[id] && isBedsValid()) {
                        updatedPropertyDetails.bedrooms[id] = {
                            beds: beds
                        };
                        queryClient.setQueryData('alertData', {
                            type: 'Bedroom',
                            message: '',
                            active: false
                        });
                    } else {
                        queryClient.setQueryData('alertData', {
                            type: 'Bedroom',
                            message: 'Number of beds must not be 0, and bed types cannot be duplicated',
                            active: true
                        });
                        return;
                    }
                } else if (modalData?.type.includes("Bathroom")) {
                    const id = modalData?.type.substring(modalData?.type.split(' ')[0].length).trim();
                    if (id && selectedFixtures.length > 0) {
                        updatedPropertyDetails.bathrooms[id].fixtures = selectedFixtures;
                        queryClient.setQueryData('alertData', {
                            type: 'Bathroom',
                            message: '',
                            active: false
                        });
                    } else {
                        queryClient.setQueryData('alertData', {
                            type: 'Bathroom',
                            message: 'Choose at least 1 fixture.',
                            active: true
                        });
                        return;
                    }
                } else if (modalData?.type.includes("Contact")) {
                    const index = typeof modalData.content === "object" && 'index' in modalData.content ? modalData.content.index as number : undefined;
                    if (index !== undefined && nameContactInput.current?.value && phoneContactInput.current?.value && phoneContactInput.current.value.startsWith("+") && isValidPhoneNumber(phoneContactInput.current.value, "PT")){
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
                            message: 'Name and phone number information must be filled and be valid in Portugal. Example: +351 910 000 000',
                            active: true
                        });
                        return;
                    
                    }
                }
                break;
            
        }
        updateProperty(id, updatedPropertyDetails, authHeader).then(async () => {
            await queryClient.invalidateQueries(`property${id}`);
            handleModalClose();
        }).catch(err => console.log(err));

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
                            {["Description", "Cancellation Policy", "Additional Info"].includes(modalData.type) ? 
                            <textarea className="border border-smoke h-32 p-2 rounded-xl mt-2 w-full text-accent bg-base-100" ref={textareaInput} defaultValue={typeof modalData.content === "string" ? modalData.content : ""} /> : 
                            modalData.type.includes("Bedroom") ?
                            <div className='flex flex-col gap-4'>
                                {typeof modalData.content === 'object' && (
                                    <>
                                        {modalData.type === "New Bedroom" && (
                                        <div>  
                                            <p className='font-light'>Bedroom Name: </p>
                                            <input placeholder="A description: Second floor bedroom" className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={stringInput}/>
                                        </div>
                                        )}
                                        <div>
                                            <div className='flex flex-row'>
                                                <span className='font-light'>Beds: </span>
                                                {beds.length < (bedTypes?.length ?? 0) ? (
                                                    <button className="ml-auto text-xl" onClick={() => addNewBed()}><BsPlusSquare className="text-accent" /></button>
                                                ) : ""}
                                            </div>
                                            {beds.length == 0 ? (
                                                <p className='font-bold'>Add beds to your bedroom</p>
                                            ) : beds.map((bed, index) => ((
                                                <div key={index} className='flex flex-row justify-center text-center gap-8 items-center'>
                                                    <div className='flex flex-col'>
                                                        <p className='font-light'>Number of beds: </p>
                                                        <input 
                                                            className='bg-base-200 p-2 rounded-xl w-40 mt-2 text-accent' 
                                                            defaultValue={bed.number_beds}
                                                            type='number'
                                                            onChange={(event) => handleChangeNumberBeds(event, index)}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <p className='font-light'>Type: </p>
                                                        <select className="select select-bordered w-40 max-w-xs" onChange={(event) => handleChangeBedType(event, index)}>
                                                            {bedTypes?.map((bedType, i) => (
                                                                <option key={i} value={bedType} selected={bedType == bed.type}>{bedType}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <p className="text-end">
                                                        <button onClick={() => removeBed(index)}>
                                                            <IoTrashOutline className=" text-red-600" />
                                                        </button>
                                                    </p>
                                                </div>
                                            )))}
                                        </div>
                                    </>
                                )}
                            </div> :
                            modalData.type.includes("Contact") ?
                            <div className='flex flex-col'>
                                {typeof modalData.content === 'object' && 'name' in modalData.content && (
                                    <div className=''>  
                                        <p className='font-light'>Name: </p>
                                        <input 
                                            className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' 
                                            ref={nameContactInput} 
                                            defaultValue={ typeof modalData.content === "object" && typeof modalData.content.name === "string" ? modalData.content.name : ""}
                                            placeholder="Contact's name"
                                        />
                                        <p className='font-light'>Phone Number: </p>
                                        <input 
                                            className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' 
                                            ref={phoneContactInput}
                                            defaultValue={ typeof modalData.content === "object" && typeof modalData.content.phone_number === "number" ? "+" + modalData.content.phone_number : ""}
                                            placeholder='+351 910 000 000'
                                        />
                                    </div>
                                )}
                            </div> :
                            modalData.type.includes("Bathroom") ?
                            <div className='flex flex-col'>
                                    <div>  
                                        {modalData.type === "New Bathroom" && (
                                            <>
                                             <p className='font-light'>Bathroom Name: </p>
                                             <input placeholder="An arbitrary name: Ground floor" className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={stringInput}/>
                                             </>
                                        )}
                                        <p className='font-light'>Bathroom Fixtures: </p>
                                        <div className='flex flex-row gap-2'>
                                            {bathroomFixtures?.map((fixture, index) => (
                                                <div key={index}>
                                                    <label className='label cursor-pointer'>
                                                        <span className='label-text capitalize pr-1'>{fixture}</span>
                                                        <input 
                                                            className='checkbox'
                                                            type="checkbox" 
                                                            checked={selectedFixtures.includes(fixture)} 
                                                            onChange={(event) => handleFixturesCheckbox(event, fixture)}
                                                        />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                
                            </div> :
                            modalData.type === "Price (per night €)" ?
                            <div className='flex flex-col'>
                                    <div>   
                                        {typeof modalData.content === "object" && 'price' in modalData.content && modalData.content.recommended_price !== null &&
                                            <div className="alert alert-success mb-8">
                                                    <span>Recommended price: {`${Number.parseFloat(modalData.content.recommended_price).toFixed(2)} €`}</span>
                                            </div>
                                        }
                                        <p>New price:</p>
                                        <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' 
                                            ref={stringInput} 
                                            defaultValue={(typeof modalData.content === "object" && 'price' in modalData.content && typeof modalData.content.price === "number") ? modalData.content.price : 0}                                            
                                            placeholder='Set a new price. Example: 200'

                                        />
                                            <label className="label cursor-pointer pt-2">
                                                <span className="label-text">After commission</span> 
                                                <input 
                                                    type="checkbox" 
                                                    onChange={(e) => setAfterCommission(e.target.checked)}
                                                    checked={afterCommission} 
                                                    className="checkbox" 
                                                />
                                            </label>
                                        
                                    </div>
                            </div> :
                            modalData.type === "House Rules" ?
                            <div>
                                {typeof modalData.content === "object" && typeof ruleCheckboxes === "object" && (
                                    Object.entries(ruleCheckboxes).map(([rule, value], index) => (
                                        <div key={index}>
                                            <label className='label cursor-pointer'>
                                                <span className='label-text capitalize'>{rule}</span>
                                                <input 
                                                    className='checkbox'
                                                    type="checkbox" 
                                                    checked={value as boolean} 
                                                    onChange={() => handleRuleCheckbox(rule)}
                                                />
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div> :
                            modalData.type === "Amenities" ?
                            <div>
                                {typeof modalData.content === "object" && typeof ruleCheckboxes === "object" && (
                                    availableAmenities?.map((amenity, index) => (
                                        <div key={index}>
                                            <label className='label cursor-pointer'>
                                                <span className='label-text capitalize'>{amenity}</span>
                                                <input 
                                                    className='checkbox'
                                                    type="checkbox" 
                                                    checked={selectedAmenities.includes(amenity)} 
                                                    onChange={(event) => handleAmenitiesCheckbox(event, amenity)}
                                                />
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div> :
                            ["Check In", "Check Out", "Rest Time"].includes(modalData.type) ?
                                (
                                    <div className='flex gap-5'>
                                        <div className='flex justify-center'>
                                            <label>
                                                Begin time:
                                            </label>
                                            <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={beginTimeInput} defaultValue={(modalData.content as string).split(" - ")[0]} placeholder='HH:MM'></input>
                                        </div>
                                        <div className='flex justify-center'>
                                            <label>
                                                End time:
                                            </label>
                                            <input className='bg-base-200 p-2 rounded-xl mt-2 w-full text-accent' ref={endTimeInput} defaultValue={(modalData.content as string).split(" - ")[1]} placeholder='HH:MM'></input>
                                        </div>
                                        
                                    </div>
                                ) :
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
