import axios from 'axios';
import { IFetchProperty } from "../types/PropertyType";

const URL = 'http://localhost/api';


const fetchProperties = async (userId: number, authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/properties?user_id=${userId}`, {
        headers: {
            Authorization: authHeader,
        },
    });

    return res.data as IFetchProperty[];
}


export { fetchProperties };