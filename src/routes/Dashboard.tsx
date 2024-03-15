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
      status: "occupied",
    },
    {
      id: 2,
      name: "Hotel B",
      address: "456 Elm Street ABCDEF",
      status: "free",
    },
    {
      id: 3,
      name: "Hotel C",
      address: "789 Oak Street BLABLA",
      status: "check-in soon",
    },
    {
      id: 4,
      name: "Hotel D",
      address: "101 Pine St",
      status: "check-out soon",
    },
  ];
  return (
    <>
      <div className="h-screen w-screen fixed">
        <Navbar />
        <div className="grid lg:grid-cols-[16rem_auto] gap-1 h-full">
          <Drawer />
          {/* Main page content (calendar, etc...)*/}
          <div className="grid grid-rows-[22rem_auto]">
            <div className="border border-green-500">Calendar</div>
            <div className="grid grid-cols-2">
              <div className="border border-blue-600">Property List</div>
              <div className="border border-pink-700">Chat</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
