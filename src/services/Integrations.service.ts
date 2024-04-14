import axios from "axios"
import { IIntegration } from "../routes/Integrations"
import { IUser } from "../types/UserType"

const URL = "http://localhost/api"


interface ExternalServicesResponse {
    title: string
}

interface UserConnectedServicesResponse {
    id: number,
    email: string,
    connected_services: ExternalServicesResponse[]
}

export const fetchExternalServices = async (authHeader: string) => {
    const res = await axios.get<ExternalServicesResponse[]>(`${URL}/UserService/services`, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as IIntegration[]
}

export const fetchUserConnectedServices = async (authHeader: string) => {
    const res = await axios.get<UserConnectedServicesResponse>(`${URL}/UserService/users`, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data.connected_services as IIntegration[]
}

export const fetchUser = async (authHeader: string) => {
    const res = await axios.get<UserConnectedServicesResponse>(`${URL}/UserService/users`, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as IUser;
}

export const connectUserToService = async (authHeader: string, service: IIntegration) => {
    const res = await axios.post<UserConnectedServicesResponse>(`${URL}/UserService/services`, 
        service,
        {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as IUser;
}
