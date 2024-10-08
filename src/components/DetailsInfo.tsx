import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { BsPlusSquare } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProperty, updateProperty } from "../services/Property.service";
import { Amenity, BathroomFixture, Bed, IFetchProperty } from "../types/PropertyType";
import { useContext, useMemo, useState } from "react";
import { getRandomImages } from "../utils/property_utils";
import { PropertyDetailsToastContext } from "../context/PropertyDetailsToastContext";

export type ModalContentType = string | number | Bed[] | { price: number; after_commission: boolean; recommended_price: number;}
                                | string[] | { name: string; phone_number: number; index: number; } | { name: string; phone_number: number; }  
                                | Record<string, boolean> | Amenity[] | BathroomFixture[] | undefined;

export interface IModalData {
    content: ModalContentType,
    type: string;
    isOpen: boolean;
}

export interface IModalDeleteData {
    id: string;
    index?: number;
    isOpen: boolean;
    prop_id: string;
}


export function DetailsInfo() {
    const authHeader = useAuthHeader() ?? '';
    const queryClient = useQueryClient();
    const id = useParams<{ id: string }>().id?.toString() ?? "";
    const {setIsShowing, setToastMessage} = useContext(PropertyDetailsToastContext);

    
    const { data: propertyDetails } = useQuery<IFetchProperty>(`property${id}`, () => fetchProperty(id, authHeader).then(data => data), { staleTime: Infinity });

    // keeps images betweeen renders, unless property details changes
    const images = useMemo(() => {
        return getRandomImages(propertyDetails?.title ?? 'a');
    }, [propertyDetails]);
    
    if (!propertyDetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    
    function getBooleanHouseRules() {
        const bool_rules: Record<string, boolean> = {};
        if (propertyDetails?.house_rules)
            for (const [rule, value] of Object.entries(propertyDetails?.house_rules)) {
                if (typeof value === "boolean")
                    bool_rules[rule] = value;
            }

        return bool_rules;
    }
    
    const handleOpenModal = (content: ModalContentType, type: string) => {
        const modalData: IModalData = {
            content: content,
            type: type,
            isOpen: true
        }
        queryClient.setQueryData<IModalData>("modalData", modalData);
    }

    const handleOpenDeleteModal = (id_detail: string, index?: number) => {
        const modalDeleteData: IModalDeleteData = {
            id: id_detail,
            index: index ?? undefined,
            isOpen: true,
            prop_id: id
        }

        queryClient.setQueryData<IModalDeleteData>("modalDeleteData", modalDeleteData);
    }

    const handleUpdatePriceAutomatically = () => {
        const updatedPropertyDetails = { ...propertyDetails, update_price_automatically: !propertyDetails.update_price_automatically };
        if (updatedPropertyDetails.update_price_automatically && updatedPropertyDetails.recommended_price !== 0 && updatedPropertyDetails.recommended_price !== null) {
            updatedPropertyDetails.price = updatedPropertyDetails.recommended_price;
        }
        updateProperty(id, updatedPropertyDetails, authHeader).then(() => queryClient.setQueryData(`property${id}`, updatedPropertyDetails)).catch(err => console.log(err));
        if (updatedPropertyDetails.update_price_automatically) {
            setIsShowing(true)
            setToastMessage("Automatic price updates have been successfully activated. A new price will be recommended at midnight.")
            setTimeout(() => {
                setToastMessage("")
                setIsShowing(false)
            }, 5000);
        }

    }

    return (
        <div className="shadow-md border rounded-xl p-4 mt-4 mb-16">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 p-2">
                    <figure>
                        <img className="rounded-t-xl w-full md:w-auto" src={images[0]} alt="Imagem Principal" />
                    </figure>
                    <div className="flex flex-row">
                        <figure className="w-1/3">
                            <img src={images[1]} className="object-cover w-full h-full" alt="Imagem 1" />
                        </figure>
                        <figure className="w-1/3">
                            <img src={images[2]} className="object-cover w-full h-full" alt="Imagem 2" />
                        </figure>
                        <figure className="w-1/3 relative">
                            <img src={images[3]} className="object-cover w-full h-full" alt="Imagem 3" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <button className="text-white text-3xl px-3 py-1 rounded-full mx-1">•••</button>
                            </div>
                        </figure>
                    </div>
                </div>
                <div className="w-full md:w-3/4 p-2">
                    <h1 className="text-xl font-semibold text-accent">General Information</h1>
                    <hr className="mb-8"/>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="title" className="text-accent mr-2 font-medium">Title:</label>
                            <input id="title" type="text" className="text-accent font-light w-full bg-base-100" value={propertyDetails.title} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.title, "Title")}> <FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="address" className="text-accent mr-2 font-medium">Address:</label>
                            <input id="address" type="text" className="text-accent font-light w-full bg-base-100" value={propertyDetails.address} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.address, "Address")}><FaRegEdit className="text-accent" /></button>                                    </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="description" className="text-accent mr-2 font-medium">Description:</label>
                            <textarea id="description" className="text-accent font-light w-full bg-base-100" value={propertyDetails.description} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.description, "Description")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex ">
                            <label htmlFor="guests" className="text-accent mr-2 font-medium w-1/3">Number of guests:</label>
                            <input id="guests" type="text" className="text-accent font-light bg-base-100 h-fit w-full" value={propertyDetails.number_guests} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.number_guests, "Number of guests")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex h-fit">
                            <label htmlFor="area" className="text-accent mr-2 font-medium">Area:</label>
                            <input id="area" type="text" className="text-accent font-light w-full bg-base-100" value={`${propertyDetails.square_meters}m²`} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.square_meters, "Area (m²)")} ><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex flex-wrap">
                            <div className="flex flex-row w-full items-center">
                                <label htmlFor="price" className="text-accent mr-2 font-medium w-1/3">Price per night:</label>
                                <input id="price" type="text" className="text-accent font-light bg-base-100 w-full text-xl" value={`${Number.parseFloat(propertyDetails.price).toFixed(2)}€`}  readOnly />
                                <button className="ml-auto" onClick={() => handleOpenModal({price: propertyDetails.price, after_commission: propertyDetails.after_commission, recommended_price: propertyDetails.recommended_price}, "Price (per night €)")}>
                                    <FaRegEdit className="text-accent" />
                                </button>
                            </div>
                            <div className="mt-2 w-full">
                                <div className="form-control flex flex-row justify-between relative">
                                    <div className="flex items-center gap-1 justify-between">
                                        <span className="label-text text-primary">Updates automatically with recommended price:</span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="tooltip tooltip-secondary tooltip-left mr-2 font-thin" data-tip="Enable this checkbox to automatically update the property's price based on market trends every day at midnight.">
                                            <button className="btn btn-ghost btn-xs">?</button>
                                        </div>
                                        <label className="label cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                defaultChecked={propertyDetails.update_price_automatically} 
                                                onClick={handleUpdatePriceAutomatically} 
                                                className="checkbox border-primary justify-end" 
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap-reverse w-full p-2">
                    <div className="flex flex-col gap-4 md:w-1/4 pr-8">
                        <div>
                            <p className="text-xl font-semibold text-accent">Rules of the property:</p>
                            <hr/>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent mr-2 font-medium w-full">Check In:</label>
                            <input id="text" type="text" className="text-accent font-light w-full bg-base-100" value={`${propertyDetails?.house_rules.check_in.begin_time} - ${propertyDetails?.house_rules.check_in.end_time}`} readOnly />
                            <button  onClick={() => handleOpenModal(propertyDetails?.house_rules.check_in.begin_time + " - " + propertyDetails?.house_rules.check_in.end_time, "Check In")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent mr-2 font-medium w-full">Check Out:</label>
                            <input id="text" type="text" className="text-accent font-light w-full bg-base-100" value={`${propertyDetails?.house_rules.check_out.begin_time} - ${propertyDetails?.house_rules.check_out.end_time}`} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.house_rules.check_out.begin_time + " - " + propertyDetails?.house_rules.check_out.end_time, "Check Out")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent mr-2 font-medium w-full">Rest Time:</label>
                            <input id="text" type="text" className="text-accent font-light w-full bg-base-100" value={`${propertyDetails?.house_rules.rest_time.begin_time} - ${propertyDetails?.house_rules.rest_time.end_time}`} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.house_rules.rest_time.begin_time + " - " + propertyDetails?.house_rules.rest_time.end_time, "Rest Time")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex mt-8">
                            <div className="flex flex-col gap-4 w-full">
                                {Object.entries(getBooleanHouseRules()).map(([rule, bool_value], i) => (
                                    <p key={i} className={`font-bold capitalize ${bool_value ? "text-green-500" : "text-red-500"}`}>{rule}: <span className="text-accent font-light">{bool_value ? "Allowed" : "Not Allowed"}</span></p>
                                ))}
                            </div>
                            <button onClick={() => handleOpenModal(getBooleanHouseRules(), "House Rules")}><FaRegEdit className="text-accent" /></button>
                        </div>

                    </div>
                    <div className="flex flex-col gap-6 md:w-3/4">
                        <div>
                            <h1 className="text-xl font-semibold text-accent">Facilities</h1>
                            <hr/>
                        </div>

                        <div className="relative">
                            <label htmlFor="text" className="text-accent font-medium">Bathrooms:</label>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Bathroom</th>
                                        <th>Items</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody className=" font-light">
                                        {Object.entries(propertyDetails?.bathrooms ?? {}).map(([bathroomId, items]) => (                                                    
                                        <tr key={bathroomId}>
                                            <th className="font-semibold">{bathroomId}</th>
                                            <td className="w-full">{(items.fixtures as string[]).join(', ')}</td>
                                            <td className="text-end w-full"><button onClick={() => handleOpenModal(items.fixtures, "Bathroom " + bathroomId)}><FaRegEdit className="text-accent" /></button></td>
                                            <td className="text-end"><button onClick={() => handleOpenDeleteModal("Bathroom " + bathroomId)}><IoTrashOutline className=" text-red-600" /></button></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="absolute top-2 right-2 text-xl" onClick={() => handleOpenModal("", "New Bathroom")}><BsPlusSquare className="text-accent" /></button>
                        </div>
                        <div className="relative pt-4">
                            <label htmlFor="text" className="text-accent font-medium">Bedrooms:</label>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Bedroom</th>
                                        <th>Number of beds</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody className="font-light">
                                        {Object.entries(propertyDetails?.bedrooms ?? {}).map(([bedroomId, bedroomDetails]) => (
                                        <tr key={bedroomId}>
                                            <th className="font-semibold">{bedroomId}</th>
                                            <td className="w-full">{bedroomDetails.beds.map(bed => bed.type + ": " + bed.number_beds).join(", ")}</td>
                                            <td className="text-end w-full"><button onClick={() => handleOpenModal(bedroomDetails.beds, "Bedroom " + bedroomId)}><FaRegEdit className="text-accent" /></button></td>
                                            <td className="text-end"><button onClick={() => handleOpenDeleteModal("Bedroom " + bedroomId)}><IoTrashOutline className=" text-red-600" /></button></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="absolute top-2 right-2 text-xl" onClick={() => handleOpenModal([] as Bed[], "New Bedroom")}><BsPlusSquare className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent font-medium">Amenities:</label>
                            <textarea id="amenties" className="ml-4 text-accent font-light bg-base-100 h-fit w-full" value={propertyDetails?.amenities.join(', ')} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.amenities, "Amenities")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-accent">Additional Details</h1>
                            <hr/>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent font-medium w-1/5">Additional Information:</label>
                            <textarea id="additional_info" className="text-accent font-light bg-base-100 h-fit w-full" value={propertyDetails?.additional_info} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.additional_info, "Additional Info")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <label htmlFor="text" className="text-accent font-medium w-1/5 ">Cancellation Policy:</label>
                            <textarea id="cancellationPolicy" className="text-accent font-light bg-base-100 h-fit w-full" value={propertyDetails?.cancellation_policy} readOnly />
                            <button onClick={() => handleOpenModal(propertyDetails?.cancellation_policy, "Cancellation Policy")}><FaRegEdit className="text-accent" /></button>
                        </div>
                        <div className="relative pt-4">
                            <label htmlFor="text" className="text-accent font-medium">Contacts:</label>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-light">
                                        {propertyDetails?.contacts.map((contact, index) => (
                                        <tr key={index}>
                                            <th className="whitespace-nowrap font-semibold">{contact.name}</th>
                                            <td>{contact.phone_number}</td>
                                            <td className="text-end" ><button onClick={() => handleOpenModal({name: contact.name, phone_number: Number.parseInt(contact.phone_number), index: index}, "Contact " + contact.name)}><FaRegEdit className="text-accent" /></button></td>
                                            <td className="text-end"><button onClick={() => handleOpenDeleteModal("Contact " + contact.name, index)}><IoTrashOutline className=" text-red-600" /></button></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="absolute top-2 right-2 text-xl" onClick={() => handleOpenModal({name: "", phone_number: 0}, "New Contact")}><BsPlusSquare className="text-accent" /></button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    );
}