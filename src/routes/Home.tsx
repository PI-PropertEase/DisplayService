import ToogleDarkMode from "../components/ToogleDarkMode";
import { IoLink } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsTagsFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartPieSliceFill } from "react-icons/pi";

export default function Home() {
    return (
        <>
            <div className="fixed w-full bg-secondary flex flex-row items-center justify-between px-4">
                <img src="./src/assets/logo.png" alt="logo" className="max-h-24 m-2" />
                <ToogleDarkMode />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center py-64 gap-24 px-8">
                    <div className="md:w-1/2 flex flex-col gap-16">
                        <h1 className="text-8xl md:text-6xl xl:text-8xl font-bold">Unlock Your Property&apos;s Potential with PropertEase!</h1>
                        <p className="text-4xl font-light">With PropertEase, you will automate processes and maximize profit, while minimizing effort required.</p>
                        <div className="flex space-x-4">
                            <button className="btn btn-outline btn-primary btn-lg md:btn-wide text-3xl font-light">
                                Sign Up
                            </button>
                            <button className="btn btn-primary btn-lg md:btn-wide text-3xl font-light">
                                Sign in
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <figure><img src="./src/assets/imgHomePage.png" alt="PropertEase" className="rounded-3xl shadow shadow-base-200 "/></figure>
                    </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center px-10 sm:px-10 md:px-20 lg:px-24 xl:px-40">
                <div>  
                    <h1 className="text-6xl font-bold text-center">Simplify property management</h1>
                    <p className="text-3xl font-light mt-10  text-center">Automate the boring stuff and focus your business</p>
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
            
        </>
    );
}
