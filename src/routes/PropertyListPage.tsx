import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { IProperty } from "../components/PropertyListDashboard";
import PropertyTable from "../components/PropertyTable";

const PropertyListPage: React.FC = () => {
  const mockProperties: IProperty[] = [
    {
      id: 1,
      name: "Hotel 1",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 2,
      name: "Hotel 2",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 3,
      name: "Hotel 3",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 4,
      name: "Hotel 4",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 5,
      name: "Hotel 5",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 6,
      name: "Hotel 6",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 7,
      name: "Hotel 7",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 8,
      name: "Hotel 8",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 9,
      name: "Hotel 9",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 10,
      name: "Hotel 10",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 11,
      name: "Hotel 11",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 12,
      name: "Hotel 12",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 13,
      name: "Hotel 13",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 14,
      name: "Hotel 14",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 15,
      name: "Hotel 15",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 16,
      name: "Hotel 16",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 17,
      name: "Hotel 17",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 18,
      name: "Hotel 18",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 19,
      name: "Hotel 19",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 20,
      name: "Hotel 20",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 21,
      name: "Hotel 21",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 22,
      name: "Hotel 22",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 23,
      name: "Hotel 23",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 24,
      name: "Hotel 24",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 25,
      name: "Hotel 25",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 26,
      name: "Hotel 26",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 27,
      name: "Hotel 27",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 28,
      name: "Hotel 28",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 29,
      name: "Hotel 29",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 30,
      name: "Hotel 30",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 31,
      name: "Hotel 31",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 32,
      name: "Hotel 32",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 33,
      name: "Hotel 33",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 34,
      name: "Hotel 34",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 35,
      name: "Hotel 35",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 36,
      name: "Hotel 36",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 37,
      name: "Hotel 37",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 38,
      name: "Hotel 38",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 39,
      name: "Hotel 39",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 40,
      name: "Hotel 40",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 41,
      name: "Hotel 41",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 42,
      name: "Hotel 42",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 43,
      name: "Hotel 43",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 44,
      name: "Hotel 44",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 45,
      name: "Hotel 45",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 46,
      name: "Hotel 46",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 47,
      name: "Hotel 47",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 48,
      name: "Hotel 48",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 49,
      name: "Hotel 49",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 50,
      name: "Hotel 50",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 51,
      name: "Hotel 51",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 52,
      name: "Hotel 52",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 53,
      name: "Hotel 53",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 54,
      name: "Hotel 54",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 55,
      name: "Hotel 55",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 56,
      name: "Hotel 56",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
  ];

  return (
    <>
      <div className="h-screen relative">
        <Navbar />
        <div className="grid grid-cols-[0.0001rem_auto] lg:grid-cols-[16rem_auto] gap-1 h-full">
          <Drawer />
          {/* Main page content (calendar, etc...)*/}
          <div className="border border-gray-200 dark:border-gray-800 mt-4 mr-6 ml-6 mb-4 rounded-xl shadow-lg">
            <PropertyTable propertyList={mockProperties} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
