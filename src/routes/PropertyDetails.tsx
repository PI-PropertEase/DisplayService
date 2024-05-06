import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { BsPlusSquare } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Drawer from "../components/Drawer";
import ModalDeletePropertyDetail from "../components/ModalDeletePropertyDetail";
import ModalPropertyDetails from "../components/ModalPropertyDetails";
import Navbar from "../components/Navbar";
import { fetchProperty, updateProperty } from "../services/Property.service";
import { Amenity, BathroomFixture, Bed, IFetchProperty } from "../types/PropertyType";
import PropertyDetailsAllTables from "../components/PropertyDetailsAllTables";

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


export default function PropertyDetails() {
    const authHeader = useAuthHeader() ?? '';
    const queryClient = useQueryClient();
    const id = useParams<{ id: string }>().id?.toString() ?? "";

    const { data: propertyDetails } = useQuery<IFetchProperty>(`property${id}`, () => fetchProperty(id, authHeader).then(data => data), { staleTime: Infinity });
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
        
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <Drawer />
                <div className="flex-1 p-8 overflow-y-auto h-svh">
                    <h1 className="text-accent text-2xl mt-20 font-semibold">Property Details</h1>
                    <div className="shadow-md border rounded-xl p-4 mt-4 mb-16">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/4 p-2">
                                <figure>
                                    <img className="rounded-t-xl w-full md:w-auto" src="https://images.adsttc.com/media/images/5a54/84b8/f197/cc41/af00/0485/newsletter/JM_HabitacaoBarreiro_Ovar_166.jpg?1515488423" alt="Shoes" />
                                </figure>
                                <div className="flex flex-row">
                                    <figure className="w-1/3">
                                        <img src="https://www.jasminsoftware.pt/wp-content/uploads/2020/05/alojamento_local_dicas.jpg" className="object-cover w-full h-full" alt="Imagem 1" />
                                    </figure>
                                    <figure className="w-1/3">
                                        <img src="https://cdn-dfjlp.nitrocdn.com/iUlbUegjmHRhHIJcQaVwEmsMirSBhuRt/assets/static/optimized/rev-a0b5f77/wp-content/uploads/2021/09/imagem-post-blog-1024x683.jpg" className="object-cover w-full h-full" alt="Imagem 2" />
                                    </figure>
                                    <figure className="w-1/3 relative">
                                        <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/327465405.jpg?k=37cbf6e38bb0b65eb85d0e55b904c10123712e0556ba6ec4f337a4c78cb1d260&o=&hp=1" className="object-cover w-full h-full" alt="Imagem 3" />
                                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                            <button className="text-white text-3xl px-3 py-1 rounded-full mx-1">•••</button>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                            <div className="w-full md:w-3/4 p-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="title" className="text-accent">Title:</label>
                                        <input id="title" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails.title} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.title, "Title")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="address" className="text-accent">Address:</label>
                                        <input id="address" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails.address} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.address, "Address")}><FaRegEdit className="text-accent" /></button>                                    </div>
                                    <div className="col-span-2 relative">
                                        <label htmlFor="description" className="text-accent">Description:</label>
                                        <textarea id="description" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails.description} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.description, "Description")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="guests" className="text-accent">Number of guests:</label>
                                        <input id="guests" type="number" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails.number_guests} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.number_guests, "Number of guests")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="area" className="text-accent">Area:</label>
                                        <input id="area" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails.square_meters}m²`} readOnly />
                                        <button className="absolute top-2 right-2"  onClick={() => handleOpenModal(propertyDetails?.square_meters, "Area (m²)")} ><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="price" className="text-accent">Price per night:</label>
                                        <input id="price" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${Number.parseFloat(propertyDetails.price).toFixed(2)}€`}  readOnly />
                                        <button className="absolute top-2 right-2"  onClick={() => handleOpenModal({price: propertyDetails.price, after_commission: propertyDetails.after_commission, recommended_price: propertyDetails.recommended_price}, "Price (per night €)")}><FaRegEdit className="text-accent" /></button>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Updates automatically with the best price </span> 
                                                <input type="checkbox" defaultChecked={propertyDetails.update_price_automatically} onClick={handleUpdatePriceAutomatically} className="checkbox" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap-reverse w-full p-2">
                                <div className="w-full md:w-1/4 pr-4">
                                    <p className="font-medium text-accent text-lg mt-4">Rules of the property:</p>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Check In:</label>
                                        <input id="text" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails?.house_rules.check_in.begin_time} - ${propertyDetails?.house_rules.check_in.end_time}`} readOnly />
                                        <button className="absolute top-2 right-2 pt-3"  onClick={() => handleOpenModal(propertyDetails?.house_rules.check_in.begin_time + " - " + propertyDetails?.house_rules.check_in.end_time, "Check In")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Check Out:</label>
                                        <input id="text" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails?.house_rules.check_out.begin_time} - ${propertyDetails?.house_rules.check_out.end_time}`} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.house_rules.check_out.begin_time + " - " + propertyDetails?.house_rules.check_out.end_time, "Check Out")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Rest Time:</label>
                                        <input id="text" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails?.house_rules.rest_time.begin_time} - ${propertyDetails?.house_rules.rest_time.end_time}`} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.house_rules.rest_time.begin_time + " - " + propertyDetails?.house_rules.rest_time.end_time, "Rest Time")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        {Object.entries(getBooleanHouseRules()).map(([rule, bool_value], i) => (
                                            <p key={i} className={`font-bold capitalize ${bool_value ? "text-green-500" : "text-red-500"}`}>{rule}: <span className="text-accent font-light">{bool_value ? "Allowed" : "Not Allowed"}</span></p>
                                        ))}
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(getBooleanHouseRules(), "House Rules")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Bathrooms:</label>
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
                                                <tbody>
                                                    {Object.entries(propertyDetails?.bathrooms ?? {}).map(([bathroomId, items]) => (                                                    
                                                    <tr key={bathroomId}>
                                                        <th>{bathroomId}</th>
                                                        <td className="w-full">{(items.fixtures as string[]).join(', ')}</td>
                                                        <td className="text-end w-full"><button onClick={() => handleOpenModal(items.fixtures, "Bathroom " + bathroomId)}><FaRegEdit className="text-accent" /></button></td>
                                                        <td className="text-end"><button onClick={() => handleOpenDeleteModal("Bathroom " + bathroomId)}><IoTrashOutline className=" text-red-600" /></button></td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="absolute top-2 right-2 pt-6 text-xl" onClick={() => handleOpenModal("", "New Bathroom")}><BsPlusSquare className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Bedrooms:</label>
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
                                                <tbody>
                                                    {Object.entries(propertyDetails?.bedrooms ?? {}).map(([bedroomId, bedroomDetails]) => (
                                                    <tr key={bedroomId}>
                                                        <th>{bedroomId}</th>
                                                        <td className="w-full">{bedroomDetails.beds.map(bed => bed.type + ": " + bed.number_beds).join(", ")}</td>
                                                        <td className="text-end w-full"><button onClick={() => handleOpenModal(bedroomDetails.beds, "Bedroom " + bedroomId)}><FaRegEdit className="text-accent" /></button></td>
                                                        <td className="text-end"><button onClick={() => handleOpenDeleteModal("Bedroom " + bedroomId)}><IoTrashOutline className=" text-red-600" /></button></td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="absolute top-2 right-2 pt-6 text-xl" onClick={() => handleOpenModal([] as Bed[], "New Bedroom")}><BsPlusSquare className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Amenities:</label>
                                        <textarea id="amenties" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.amenities.join(', ')} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.amenities, "Amenities")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Additional Information:</label>
                                        <textarea id="additional_info" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.additional_info} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.additional_info, "Additional Info")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Cancellation Policy:</label>
                                        <textarea id="cancellationPolicy" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.cancellation_policy} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.cancellation_policy, "Cancellation Policy")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Contacts:</label>
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
                                                <tbody>
                                                    {propertyDetails?.contacts.map((contact, index) => (
                                                    <tr key={index}>
                                                        <th className=" whitespace-nowrap">{contact.name}</th>
                                                        <td>{contact.phone_number}</td>
                                                        <td className="text-end" ><button onClick={() => handleOpenModal({name: contact.name, phone_number: Number.parseInt(contact.phone_number), index: index}, "Contact " + contact.name)}><FaRegEdit className="text-accent" /></button></td>
                                                        <td className="text-end"><button onClick={() => handleOpenDeleteModal("Contact " + contact.name, index)}><IoTrashOutline className=" text-red-600" /></button></td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="absolute top-2 right-2 pt-6 text-xl" onClick={() => handleOpenModal({name: "", phone_number: 0}, "New Contact")}><BsPlusSquare className="text-accent" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PropertyDetailsAllTables/>
                </div>
            </div>
            <ModalPropertyDetails />
            <ModalDeletePropertyDetail />
        </>
    );
}

