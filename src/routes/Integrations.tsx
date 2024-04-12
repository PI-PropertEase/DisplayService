import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";

export interface IIntegration {
    name: string;
}

export default function Integrations() {

    const integrations: IIntegration[] = [
        {
            name: "Airbnb"
        },
        {
            name: "Booking.com"
        },
        {
            name: "TripAdvisor"
        },
        {
            name: "Expedia"
        },
        {
            name: "Vrbo"
        },
        {
            name: "Guesty",
        },
        {
            name: "Rentals United"
        }
    ];

    const userIntegrations: IIntegration[] = [
        {
            name: "Airbnb"
        },
        {
            name: "Booking.com"
        },
        {
            name: "TripAdvisor"
        }
    ];

    function isUserIntegration(integration: IIntegration) {
      return userIntegrations.some(userIntegration => userIntegration.name === integration.name);
  }

    return (
        <>
           <div className="flex flex-col">
             <Navbar />
             <div className="flex flex-row flex-1">
               <Drawer />
               <div className="flex flex-col flex-1 p-8 overflow-auto pt-28">
                 <div className="flex items-center justify-center">
                   <h1 className="text-4xl font-light text-accent">Connect to your external services and start synchronizing everything!</h1>
                 </div>
                 <div className="flex flex-wrap gap-16 items-center justify-center pt-16">
                   {integrations.map((integration, index) => (
                     <div key={index} className={`relative flex flex-col items-center justify-center gap-4 p-4 shadow-sm shadow-base-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-xl ${ !isUserIntegration(integration)  && "cursor-pointer hover:bg-accent hover:bg-opacity-10 hover:transition-all hover:duration-500"  } `}>
                       <h2 className="text-2xl font-light">{integration.name}</h2>
                       { isUserIntegration(integration)  && (
                        <div className="absolute inset-0 bg-neutral opacity-15 rounded-xl z-10"></div>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
        </>
       );
       

}