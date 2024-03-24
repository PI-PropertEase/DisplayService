import { useParams } from "react-router-dom";
import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { FaRegEdit } from "react-icons/fa";

export default function PropertyDetails() {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <Drawer />
                <div className="flex-1 p-8 overflow-y-auto h-svh">
                    <h1 className="text-accent text-2xl mt-20 font-semibold">Property Details</h1>
                    <div className="shadow-md border rounded-xl p-4 mt-4 mb-16">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/3 p-2">
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
                            
                            <div className="w-full md:w-2/3 p-2">
                                <table className="">
                                    <tbody>
                                        <tr>
                                            <td className="text-accent font-semibold">Title:</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent ">
                                                    Name of the property
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-accent font-semibold">Address:</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent">
                                                    Address of the property
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-accent font-semibold">Description:</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui sed nunc vestibulum ultricies. Nullam auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc.
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-accent font-semibold">Number of guests:</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent">
                                                    4
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-accent font-semibold">Area</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent">
                                                    500m²
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-accent font-semibold">Price per night:</td>
                                            <td>
                                                <p className="bg-base-200 p-2 rounded-xl mt-2 text-accent">
                                                    50€
                                                </p>
                                            </td>
                                            <td>
                                                <button className="text-accent p-2 rounded-xl mt-2">
                                                    <FaRegEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
