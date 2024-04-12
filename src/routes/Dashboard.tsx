import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import PropertyListDashboard, {
  IProperty,
} from "../components/PropertyListDashboard";
import WeekCalendar from "../components/WeekCalendar";
import { useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { IReservation, IReservationType } from "../types/ReservationType";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUser } from "../types/UserType";

const Dashboard = () => {
  const auth = useAuthUser();
  const user: IUser = auth.user;

  const mockProperties: IProperty[] = [];
  const { properties, setProperties, setReservations } =
    useContext(PropertyContext);

  const mockReservations: IReservation[] = [
    {
      id: 1,
      property_id: 1,
      event_type: IReservationType.OCCUPATION,
      begin_time: new Date("2024/04/07"),
      end_time: new Date("2024/04/11"),
      service: "Zooking",
      status: "confirm",
    },
    {
      id: 2,
      property_id: 1,
      event_type: IReservationType.CLEANING,
      begin_time: new Date("2024/04/02"),
      end_time: new Date("2024/04/03"),
      service: "Zooking",
      status: "confirm",
    },
    {
      id: 3,
      property_id: 1,
      event_type: IReservationType.MAINTENANCE,
      begin_time: new Date("2024/04/04"),
      end_time: new Date("2024/04/05"),
      service: "Zooking",
      status: "confirm",
    },
    {
      id: 4,
      property_id: 2,
      event_type: IReservationType.OCCUPATION,
      begin_time: new Date("2024/04/07"),
      end_time: new Date("2024/04/11"),
      service: "Zooking",
      status: "confirm",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Drawer />
          {properties.length == 0 ? (
            <div className="flex flex-col flex-1 p-8 overflow-auto pt-28 justify-center text-center text-4xl">
              You have not yet connected to any external service!
            </div>
          ) : (
            <div className="flex flex-col flex-1 p-8 overflow-auto pt-28">
              <div className=" min-h-80">
                <WeekCalendar />
              </div>
              <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row pt-8 pb-20 min-h-full ">
                <div className="w-full">
                  <PropertyListDashboard />
                </div>
                <div className="w-full">
                  <h1>Chat</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
