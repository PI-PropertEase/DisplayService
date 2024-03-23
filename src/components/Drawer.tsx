import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";
import { LuBarChart } from "react-icons/lu";

export default function Drawer() {
  return (
    <div className="">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" defaultChecked />
      <div className="h-screen">
        <ul className="menu h-full bg-primary flex flex-col gap-8 pt-8 text-white  shadow-lg">
          <li className="text-2xl font-light rounded-md"><a><LuLayoutDashboard />My business</a></li>
          <li className="text-2xl font-light rounded-md"><a><CiBoxList/>Properties List</a></li>
          <li className="text-2xl font-light rounded-md"><a><FaRegCalendarAlt/> Calendar</a></li>
          <li className="text-2xl font-light rounded-md"><a><GrIntegration/> Integrations</a></li>
          <li className="text-2xl font-light rounded-md"><a><LuBarChart/> Statistics</a></li>
        </ul>
      </div>
    </div>
  );
}
