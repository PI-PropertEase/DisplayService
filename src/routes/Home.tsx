import ToogleDarkMode from "../components/ToogleDarkMode";
import { IoLink } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsTagsFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartPieSliceFill } from "react-icons/pi";

export default function Home() {
    return (
        <div className="w-screen bg-base-100 ">
            <div className="fixed top-0 w-full bg-secondary flex flex-col md:flex-row items-center justify-between px-4">
                <img src="./src/assets/logo.png" alt="logo" className="max-h-24 m-2" />
                <ToogleDarkMode />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center h-screen">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold text-accent font-sans text-center">Unlock Your Property&apos;s Potential with PropertEase!</h1>
                        <p className="font-sans text-accent text-lg mt-3 text-center ">With PropertEase, you will automate processes and maximize profit, while minimizing effort required.</p>
                        <div className="flex justify-center space-x-4 mt-5">
                            <button className="px-4 sm:px-6 md:px-14 lg:px-20 xl:px-28 bg-base-100 hover:bg-orange-100 text-primary font-bold py-2 rounded-lg border-primary">
                                Sign Up
                            </button>
                            <button className="px-4 sm:px-6 md:px-14 lg:px-20 xl:px-28 bg-primary hover:bg-orange-400 text-white font-bold py-2 rounded-lg">
                                Sign in
                            </button>
                        </div>
                    </div>
                    <div className=" w-1/2 sm:w-1/4 md:w-1/2 xl:w-96 ml-24">
                        <figure><img src="./src/assets/imgHomePage.png" alt="PropertEase" className="rounded-3xl shadow shadow-base-200 "/></figure>
                    </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center px-10 sm:px-10 md:px-20 lg:px-24 xl:px-40">
                <div>  
                    <h1 className="text-4xl font-bold text-accent font-sans text-center">Simplify property management</h1>
                    <p className="font-sans text-accent text-lg mt-10  text-center">Automate the boring stuff and focus your business</p>
                    <div className="stats shadow shadow-base-200 mt-20 mb-32 ">
                        <div className="stats-vertical ">
                            <div className="stat place-items-center">
                                <IoLink size={50} />
                                <p className="font-bold text-xl mt-4">Connect to your services</p>
                                <p className="text-center mt-4">Connect your PropertEase account to services where your properties are listed, and manage them in our central service.</p>
                            </div>
                            <div className="stat place-items-center">
                                <FaRegCalendarAlt size={50} />
                                <p className="font-bold text-xl mt-4">Calendar Sync</p>
                                <p className="text-center mt-4">PropertEase was designed to reduce manual work by syncing all reservations from  different listing websites.</p>
                            </div>
                        </div>
                        <div className="stats-vertical ">
                            <div className="stat place-items-center">
                                <BsGraphUpArrow size={50} />
                                <p className="font-bold text-xl mt-4">Grow your business</p>
                                <p className="text-center mt-4">With PropertEase you can focus on growing your business without the complexities of managing properties on different platforms.</p>
                            </div>
                            <div className="stat place-items-center">
                                <LuLayoutDashboard size={50} />
                                <p className="font-bold text-xl mt-4">User-friendly dashboard</p>
                                <p className="text-center mt-4">Ease Property Management through a user-friendly dashboard</p>
                            </div>
                        </div>
                        <div className="stats-vertical ">
                        <div className="stat place-items-center">
                                <BsTagsFill size={50} />
                                <p className="font-bold text-xl mt-4">Dynamic Prices</p>
                                <p className="text-center mt-4">Get data-driven price recommendations based  on your properties characteristics, on a daily basis.</p>
                            </div>
                            <div className="stat place-items-center">
                                <PiChartPieSliceFill size={50} />
                                <p className="font-bold text-xl mt-4">Statistics</p>
                                <p className="text-center mt-4">Allow us to show you statistics data to help you manage your business.</p>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            
        </div>
    );
}
