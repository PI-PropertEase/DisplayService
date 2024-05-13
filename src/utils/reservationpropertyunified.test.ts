import { Amenity, BathroomFixture, BedType, IFetchProperty, PropertyStatus } from "../types/PropertyType"
import { IEventType, IReservation, ReservationStatus } from "../types/ReservationType"
import { ServiceEnum } from "../types/UserType"
import { getPropertiesForPropertyTable } from "./reservationpropertyunifier"

const currentTime = new Date()

const propertyData: IFetchProperty[] = [
  {
    _id: 1,
    user_email: "john.doe@example.com",
    title: "Cozy Beach House",
    address: "123 Ocean Avenue",
    description: "Beautiful beach house with stunning ocean views.",
    number_guests: 6,
    square_meters: 200,
    price: 150,
    bedrooms: {
      master: {
        beds: [
          {
            type: BedType.SINGLE,
            number_beds: 2,
          },
        ],
      },
      guest: {
        beds: [
          {
            type: BedType.SINGLE,
            number_beds: 1,
          },
        ],
      },
    },
    bathrooms: {
      master: {
        fixtures: [BathroomFixture.SHOWER, BathroomFixture.TOILET],
      },
    },
    amenities: [Amenity.FREE_WIFI, Amenity.AIR_CONDITIONER],
    after_commission: true,
    house_rules: {
      check_in: {
        begin_time: "",
        end_time: "",
      },
      check_out: {
        begin_time: "",
        end_time: "",
      },
      rest_time: {
        begin_time: "",
        end_time: "",
      },
      smoking: false,
      allow_pets: false,
      parties: false,
    },
    additional_info: "Check-in time is after 3:00 PM",
    cancellation_policy: "Flexible",
    contacts: [
      { name: "John Doe", phone_number: "+351910000000" },
      { name: "Jane Doe", phone_number: "+351910000000" },
    ],
    recommended_price: 200,
    update_price_automatically: true,
  },
]




describe("Test converting properties to the format used in property tables, given its set of reservations", () => {
  it("given a property whose next reservation is in two days, the returned property should have a status of FREE", () => {
    const reservationData: IReservation[] = [
        {
            id: 1,
            reservation_status: ReservationStatus.CONFIRMED,
            client_email: "client@example.com",
            client_name: "John Doe",
            client_phone: "+351910000000",
            cost: 200,
            property_id: 1,
            owner_email: "john.doe@example.com",
            begin_datetime: new Date(currentTime.getTime() + 172800000), // 2 days away
            end_datetime: new Date(currentTime.getTime() + 272800000),
            type: IEventType.RESERVATION,
            service: ServiceEnum.ZOOKING,
          }
    ]
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.FREE);
  })

  it("given a property whose next reservation is within the next day, the returned property should have a status of CHECK-IN SOON", () => {
    const reservationData: IReservation[] = [
        {
            id: 1,
            reservation_status: ReservationStatus.CONFIRMED,
            client_email: "client@example.com",
            client_name: "John Doe",
            client_phone: "+351910000000",
            cost: 200,
            property_id: 1,
            owner_email: "john.doe@example.com",
            begin_datetime: new Date(currentTime.getTime() + 2800000), // 2 days away
            end_datetime: new Date(currentTime.getTime() + 272800000),
            type: IEventType.RESERVATION,
            service: ServiceEnum.ZOOKING,
          }
    ]
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.CHECK_IN_SOON);
  })

  it("given a property whose current reservation is ending within the next day, the returned property should have a status of CHECK-OUT SOON", () => {
    const reservationData: IReservation[] = [
        {
            id: 1,
            reservation_status: ReservationStatus.CONFIRMED,
            client_email: "client@example.com",
            client_name: "John Doe",
            client_phone: "+351910000000",
            cost: 200,
            property_id: 1,
            owner_email: "john.doe@example.com",
            begin_datetime: new Date(currentTime.getTime() - 2800000), // ~2 hours ago
            end_datetime: new Date(currentTime.getTime() + 2800000), // ~2 hours away
            type: IEventType.RESERVATION,
            service: ServiceEnum.ZOOKING,
          }
    ]
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.CHECK_OUT_SOON);
  })

  it("given a property with no reservations in the future, only in the past, the returned property should have a status of FREE", () => {
    const reservationData: IReservation[] = [
        {
            id: 1,
            reservation_status: ReservationStatus.CONFIRMED,
            client_email: "client@example.com",
            client_name: "John Doe",
            client_phone: "+351910000000",
            cost: 200,
            property_id: 1,
            owner_email: "john.doe@example.com",
            begin_datetime: new Date(currentTime.getTime() - 9992800000),
            end_datetime: new Date(currentTime.getTime() - 992800000),
            type: IEventType.RESERVATION,
            service: ServiceEnum.ZOOKING,
          }
    ]
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.FREE);
  })

  it("given a property with no reservations, the returned property should have a status of FREE", () => {
    const reservationData: IReservation[] = []
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.FREE);
  })

  it("given a property with a reservation ongoing that ends in two days, the returned property should have a status of OCCUPIED", () => {
    const reservationData: IReservation[] = [
        {
            id: 1,
            reservation_status: ReservationStatus.CONFIRMED,
            client_email: "client@example.com",
            client_name: "John Doe",
            client_phone: "+351910000000",
            cost: 200,
            property_id: 1,
            owner_email: "john.doe@example.com",
            begin_datetime: new Date(currentTime.getTime() - 2800000), // ~2 hours ago
            end_datetime: new Date(currentTime.getTime() + 172800000), // ~2 days away
            type: IEventType.RESERVATION,
            service: ServiceEnum.ZOOKING,
          }
    ]
    const properties = getPropertiesForPropertyTable(propertyData, reservationData)
    expect(properties.length).toBe(propertyData.length);
    expect(properties[0].status).toBe(PropertyStatus.OCCUPIED);
  })
})
