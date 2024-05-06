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
    after_commission: boolean;
    house_rules: HouseRules;
    additional_info: string;
    cancellation_policy: string;
    contacts: Contact[];
    recommended_price: number;
    update_price_automatically: boolean;
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
    after_commission?: boolean;
    house_rules?: HouseRules;
    additional_info?: string;
    cancellation_policy?: string;
    contacts?: Contact[];
}



// These are used inside of our frontend, for displaying data
// from properties that requires reservation data (arrival, departure, status, ...)
export interface IProperty {
  id?: number;
  title: string;
  address: string;
  status: PropertyStatus;
  arrival?: Date;
  departure?: Date;
  price: number;
}

export enum PropertyStatus {
  OCCUPIED = "Occupied",
  FREE = "Free",
  CHECK_IN_SOON = "Check-in Soon",
  CHECK_OUT_SOON = "Check-out Soon"
}
