import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { IProperty } from "../components/PropertyListDashboard";
import PropertyTable from "../components/PropertyTable";

const PropertyListPage: React.FC = () => {
  const mockProperties: IProperty[] = [
    {
      id: 1,
      name: "Hotel A",
      address: "123 Main Street Braga",
      status: "Occupied",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 2,
      name: "Hotel B",
      address: "456 Elm Street ABCDEF",
      status: "Free",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 3,
      name: "Hotel C",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 4,
      name: "Hotel D",
      address: "101 Pine St",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 5,
      name: "Hotel E",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 6,
      name: "Hotel F",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
      arrival: new Date(),
      departure: new Date(),
      price: 200.06,
    },
    {
      id: 7,
      name: "Hotel G",
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
