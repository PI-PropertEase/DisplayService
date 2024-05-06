import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import Drawer from "../components/Drawer"
import Navbar from "../components/Navbar"
import { connectUserToService, fetchExternalServices, fetchUserConnectedServices } from "../services/Integrations.service"
import { useEffect, useState } from "react"
import { IUser } from "../types/UserType"
import { useQueryClient, useQuery} from "react-query";


export interface IIntegration {
    title: string
}

export interface IIntegrationAlert {
    active: boolean
    alertType: string
    alertText: string
}

export default function Integrations() {
    const queryClient = useQueryClient();
    const authHeader = useAuthHeader()
    const [allExternalServices, setAllExternalServices] = useState<IIntegration[]>([])
    const [userConnectedServices, setUserConnectedServices] = useState<IIntegration[]>([])

    useEffect(() => {
        const getIntegrations = async () => {
            setAllExternalServices(await fetchExternalServices(authHeader ? authHeader : ""))
            setUserConnectedServices(await fetchUserConnectedServices(authHeader ? authHeader : ""))
        }

        getIntegrations().catch(console.error)
    }, []);

    function isUserIntegration(integration: IIntegration) {
        return userConnectedServices.some(
            (userIntegration) => userIntegration.title === integration.title
        )
    }

    const {data: alerts} = useQuery<IIntegrationAlert>('alertsIntegrations');

    function handleConnectService(integration: IIntegration) {
        if (isUserIntegration(integration)) {
            updateAlertState("info", "Integration already connected!");
            return;
        }
    
        connectUserToService(authHeader ? authHeader : "", integration)
            .then(async (data: IUser | null) => {
                if (!data) {
                    updateAlertState("error", "Integration failed!");
                    return;
                }

                updateAlertState("success", "Integration successful!");
    
                setUserConnectedServices(data.connected_services);
                await queryClient.invalidateQueries("user")
                await queryClient.invalidateQueries('fetchProperties')
                await queryClient.invalidateQueries('fetchReservations')
            })
            .catch((error) => {
                console.error("Error connecting to service:", error);
                updateAlertState("error", "An error occurred while connecting!");
            });
    }

    function updateAlertState(type: string, text: string) {
        const alertData = {
            active: true,
            alertType: type,
            alertText: text
        };
    
        queryClient.setQueryData<IIntegrationAlert>('alertsIntegrations', alertData);
    
        setTimeout(() => {
            queryClient.setQueryData<IIntegrationAlert>('alertsIntegrations', {
                active: false,
                alertType: "",
                alertText: ""
            });
        }, 3000);
    }

    return (
        <>
            <div className="flex flex-col">
                <Navbar />
                <div className="flex flex-row flex-1">
                    <Drawer />
                    <div className="flex flex-col flex-1 p-8 overflow-auto pt-28 gap-8">
                        {alerts?.active && (
                            <>
                                <div role="alert" className={`alert alert-${alerts.alertType}`}>
                                {alerts.alertType === "success" && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )}
                                {alerts.alertType === "error" && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )}
                                {alerts.alertType === "info" && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v3m0 4 0 4m-4-4h8" /></svg>
                                )}
                                <span>{alerts.alertText}</span>
                            </div>
                            </>
                        )}
                        <div className="flex items-center justify-center">
                            <h1 className="text-4xl font-light text-accent">
                                Connect to your external services and start synchronizing
                                everything!
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-16 items-center justify-center pt-16">
                            {allExternalServices.map((integration, index) => (
                                <div
                                    onClick={() => { handleConnectService(integration)} }
                                    key={index}
                                    className={`relative flex flex-col items-center justify-center gap-4 p-4 shadow-sm shadow-base-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-xl ${
                                        !isUserIntegration(integration) &&
                                        "cursor-pointer hover:bg-accent hover:bg-opacity-10 hover:transition-all hover:duration-500"
                                    } `}
                                >
                                    <h2 className="text-2xl font-light capitalize">{integration.title}</h2>
                                    {isUserIntegration(integration) && (
                                        <div className="absolute inset-0 bg-neutral opacity-15 rounded-xl z-10"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
