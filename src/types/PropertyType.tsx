export interface IFetchProperty {
    _id?: number;
    user_email: string;
    title: string;
    address: string;
    description: string;
    number_guests: number;
    square_meters: number;
    price: number;
    bedrooms: Record<string, Bedroom>;
    bathrooms: Record<string, Bathroom>;
    amenities: Amenity[];
    house_rules: HouseRules;
    additional_info: string;
    cancellation_policy: string;
    contacts: Contact[];
}

export interface Bedroom {
    beds: Bed[];
}

export enum BedType {
    SINGLE = "single",
    QUEEN = "queen",
    KING = "king",
}

export interface Bed {
    number_beds: number;
    type: BedType;
}

export interface Bathroom {
    fixtures: BathroomFixture[];
}

export enum BathroomFixture {
    BATHTUB = "bathtub",
    SHOWER = "shower",
    BIDET = "bidet",
    TOILET = "toilet"
}

export enum Amenity {
    FREE_WIFI = "free_wifi",
    PARKING_SPACE = "parking_space",
    AIR_CONDITIONER = "air_conditioner",
    POOL = "pool",
    KITCHEN = "kitchen",
}

export interface Contact {
    name: string;
    phone_number: string;
}

export interface HouseRules {
    check_in: TimeSlot;
    check_out: TimeSlot;
    smoking: boolean;
    parties: boolean;
    rest_time: TimeSlot;
    allow_pets: boolean;
}


export interface TimeSlot {
    begin_time: string;
    end_time: string;
}

export interface IUpdateProperty {
    title?: string;
    address?: string;
    description?: string;
    number_guests?: number;
    square_meters?: number;
    price?: number;
    bedrooms?: Record<string, Bedroom>;
    bathrooms?: Record<string, Bathroom>;
    amenities?: Amenity[];
    house_rules?: HouseRules;
    additional_info?: string;
    cancellation_policy?: string;
    contacts?: Contact[];
}