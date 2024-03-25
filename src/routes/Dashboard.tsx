import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import PropertyListDashboard, {
  IProperty,
} from "../components/PropertyListDashboard";
import WeekCalendar from "../components/WeekCalendar";

const Dashboard = () => {
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
    {
      id: 8,
      name: "Hotel G",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Drawer />
          <div className="flex flex-col flex-1 p-8 overflow-auto pt-28"> 
            <div className=" min-h-80"> 
              <WeekCalendar />
            </div>
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row pt-8 pb-20 min-h-full ">
              <div className="w-full">
                <PropertyListDashboard propertyList={mockProperties} />
              </div>
              <div className="w-full">
                <h1>Chat</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
