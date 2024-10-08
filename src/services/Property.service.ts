import axios from "axios"
import { Amenity, BathroomFixture, BedType, IFetchProperty, IUpdateProperty } from "../types/PropertyType"

const URL = "http://localhost/api"

export const fetchProperties = async (userEmail: string, authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/properties?user_email=${userEmail}`, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as IFetchProperty[]
}

export const fetchProperty = async (propertyId: string, authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/properties/${propertyId}`, {
        headers: {
            Authorization: authHeader,
        },
    })
    return res.data as IFetchProperty
}

export const updateProperty = async (propertyId: string, property: IUpdateProperty, authHeader: string) => {
    const res = await axios.put(`${URL}/PropertyService/properties/${propertyId}`, property, {
        headers: {
            Authorization: authHeader,
        },
    })

    return res.data as IFetchProperty
}

export const fetchAmenities = async (authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/amenities`, {
        headers: {
            Authorization: authHeader,
        },
    })
    return res.data as Amenity[];
}

export const fetchBathroomFixtures = async (authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/bathroom_fixtures`, {
        headers: {
            Authorization: authHeader,
        },
    })
    return res.data as BathroomFixture[];
}


export const fetchBedTypes = async (authHeader: string) => {
    const res = await axios.get(`${URL}/PropertyService/bed_types`, {
        headers: {
            Authorization: authHeader,
        },
    })
    return res.data as BedType[];
}