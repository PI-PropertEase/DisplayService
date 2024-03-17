import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import PropertyListDashboard, {
  IProperty,
} from "../components/PropertyListDashboard";

const Dashboard = () => {
  const mockProperties: IProperty[] = [
    {
      id: 1,
      name: "Hotel A",
      address: "123 Main Street Braga",
      status: "Occupied",
    },
    {
      id: 2,
      name: "Hotel B",
      address: "456 Elm Street ABCDEF",
      status: "Free",
    },
    {
      id: 3,
      name: "Hotel C",
      address: "789 Oak Street BLABLA",
      status: "Check-in Soon",
    },
    {
      id: 4,
      name: "Hotel D",
      address: "101 Pine St",
      status: "Check-out Soon",
    },
    {
      id: 5,
      name: "Hotel E",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
    },
    {
      id: 6,
      name: "Hotel F",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
    },
    {
      id: 7,
      name: "Hotel G",
      address: "101 Pine St asdfasdg",
      status: "Check-out Soon",
    },
  ];
  return (
    <>
      <div className="h-screen relative">
        <Navbar />
        {/* TODO: epic code :) 0.0001rem is a workaround to hide the drawer in small screens, because this uses grid layout, idk a better solution */}
        <div className="grid grid-cols-[0.0001rem_auto] lg:grid-cols-[16rem_auto] gap-1 h-full">
          <Drawer />
          {/* Main page content (calendar, etc...)*/}
          <div className="grid grid-rows-[22rem_auto]">
            <div className="border border-green-500">Calendar</div>
            <div className="grid lg:grid-cols-2">
              <div className="border border-blue-600">
                <PropertyListDashboard propertyList={mockProperties} />
              </div>
              <div className="border border-pink-700">Chat</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
