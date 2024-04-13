import axios from "axios"

const URL = "http://localhost/api"

export const fetchExternalServices = async (authHeader: string) => {
    const res = await axios.get(`${URL}/UserService/services`, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as string[]
}
