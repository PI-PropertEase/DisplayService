import axios from "axios"
import { IIntegration } from "../routes/Integrations"

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

    return res.data.map((item) => ({ name: item.title })) as IIntegration[]
}

export const fetchUserConnectedServices = async (authHeader: string) => {
    const res = await axios.get<UserConnectedServicesResponse>(`${URL}/UserService/users`, {
        headers: {
            Authorization: authHeader,
        },
    })

    console.log(res.data)

    return res.data.connected_services.map((item) => ({ name: item.title })) as IIntegration[]
}
