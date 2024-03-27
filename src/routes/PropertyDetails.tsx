import { useParams } from "react-router-dom";
import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import ModalPropertyDetails from "../components/ModalPropertyDetails";
import { useQueryClient, useQuery } from "react-query";
import { IPropertyDetails } from "../main";
import { BsPlusSquare } from "react-icons/bs";

export interface IModalData {
    content: string | number | { number_beds: number;type: string[]} | string[] | { name: string; phone: number; email: string; } |undefined ,
    type: string;
    isOpen: boolean;
}

export default function PropertyDetails() {
    const { id } = useParams<{ id: string }>();

    const queryClient = useQueryClient();

    const { data: propertyDetails } = useQuery<IPropertyDetails>('propertyDetails');
    
    function checkNotAllowed() {
        const notAllowed = [];
        
        if (propertyDetails?.house_rules) {
            for (const [key, value] of Object.entries(propertyDetails.house_rules)) {
                if (typeof value === "boolean" && !value) {
                    notAllowed.push(key.charAt(0).toUpperCase() + key.slice(1));
                }
            }
        }
        return notAllowed;
    }
    
    const checkAllowed = () => {
        const notAllowed = [];
        if (propertyDetails?.house_rules) {
            for (const [key, value] of Object.entries(propertyDetails.house_rules)) {
                if (typeof value === "boolean" && value) {
                    notAllowed.push(key.charAt(0).toUpperCase() + key.slice(1));
                }
            }
        }
        return notAllowed;
    }

    const handleOpenModal = (content: string | number | { number_beds: number;type: string[]} | string[] | { name: string; phone: number; email: string; } | undefined, type: string) => {
        const modalData: IModalData = {
            content: content,
            type: type,
            isOpen: true
        }

        queryClient.setQueryData<IModalData>("modalData", modalData);
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
                                        <input id="title" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.title} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.title, "Title")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="address" className="text-accent">Address:</label>
                                        <input id="address" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.address} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.address, "Address")}><FaRegEdit className="text-accent" /></button>                                    </div>
                                    <div className="col-span-2 relative">
                                        <label htmlFor="description" className="text-accent">Description:</label>
                                        <textarea id="description" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.description} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.description, "Description")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="guests" className="text-accent">Number of guests:</label>
                                        <input id="guests" type="number" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.number_guests} readOnly />
                                        <button className="absolute top-2 right-2" onClick={() => handleOpenModal(propertyDetails?.number_guests, "Number of guests")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="area" className="text-accent">Area:</label>
                                        <input id="area" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails?.square_meters}m²`} readOnly />
                                        <button className="absolute top-2 right-2"  onClick={() => handleOpenModal(propertyDetails?.square_meters, "Area (m²)")} ><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 relative">
                                        <label htmlFor="price" className="text-accent">Price per night:</label>
                                        <input id="price" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={`${propertyDetails?.price_per_night}€`}  readOnly />
                                        <button className="absolute top-2 right-2"  onClick={() => handleOpenModal(propertyDetails?.price_per_night, "Price (per night €)")}><FaRegEdit className="text-accent" /></button>
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
                                        <label htmlFor="text" className="text-accent">Not Allowed:</label>
                                        <input id="text" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={checkNotAllowed().join(', ')} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(checkNotAllowed().join(', '), "Not Allowed")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Allowed:</label>
                                        <input id="text" type="text" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={checkAllowed().join(', ')}readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(checkAllowed().join(', '), "Allowed")}><FaRegEdit className="text-accent" /></button>
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
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from(propertyDetails?.bathrooms ?? new Map()).map(([bathroomId, items]) => (                                                    
                                                    <tr key={bathroomId as string}>
                                                        <th>{bathroomId}</th>
                                                        <td>{(items as string[] ).join(', ')}</td>
                                                        <td className="text-end"><button onClick={() => handleOpenModal((items as string[] ).join(', '), "Bathroom " + bathroomId)}><FaRegEdit className="text-accent" /></button></td>
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
                                                    <th>Type</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(propertyDetails?.bedrooms ?? {}).map(([bedroomId, bedDetails]) => (
                                                    <tr key={bedroomId}>
                                                        <th>{bedroomId}</th>
                                                        <td>{bedDetails.number_beds}</td>
                                                        <td>{bedDetails.type.join(', ')}</td>
                                                        <td className="text-end"><button onClick={() => handleOpenModal(bedDetails, "Bedroom " + bedroomId)}><FaRegEdit className="text-accent" /></button></td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="absolute top-2 right-2 pt-6 text-xl" onClick={() => handleOpenModal({number_beds: 0, type: []}, "New Bedroom")}><BsPlusSquare className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Amenities:</label>
                                        <textarea id="amenties" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.amenities.join(', ')} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.amenities.join(', '), "Amenities")}><FaRegEdit className="text-accent" /></button>
                                    </div>
                                    <div className="relative pt-4">
                                        <label htmlFor="text" className="text-accent">Notes:</label>
                                        <textarea id="notes" className="bg-base-200 p-2 rounded-xl mt-2 w-full text-accent" value={propertyDetails?.notes} readOnly />
                                        <button className="absolute top-2 right-2 pt-3" onClick={() => handleOpenModal(propertyDetails?.notes, "Notes")}><FaRegEdit className="text-accent" /></button>
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
                                                    <th>Email</th>
                                                    <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {propertyDetails?.contact.map((contact) => (
                                                    <tr key={contact.id}>
                                                        <th>{contact.name}</th>
                                                        <td>{contact.phone}</td>
                                                        <td>{contact.email}</td>
                                                        <td className="text-end" ><button onClick={() => handleOpenModal(contact, "Contact " + contact.id)}><FaRegEdit className="text-accent" /></button></td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button className="absolute top-2 right-2 pt-6 text-xl" onClick={() => handleOpenModal({name: "", phone: 0, email:""}, "New Contact")}><BsPlusSquare className="text-accent" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPropertyDetails />
        </>
    );
}

