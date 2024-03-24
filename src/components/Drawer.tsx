import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";
import { LuBarChart } from "react-icons/lu";

export default function Drawer() {
  const [showText, setShowText] = useState(false);

  const toggleShowText = () => {
    setShowText(!showText);
  };

  return (
    <div className="pt-20" onMouseEnter={toggleShowText} onMouseLeave={toggleShowText}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" defaultChecked />
      <div className="h-screen">
        <ul className="menu h-full bg-primary flex flex-col gap-8 pt-8 text-white shadow-lg">
          {/* Ícones visíveis em telas pequenas */}
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <a>
              <LuLayoutDashboard />
              {showText && <span className="ml-2">My business</span>}
            </a>
          </li>
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <a>
              <CiBoxList />
              {showText && <span className="ml-2">Properties List</span>}
            </a>
          </li>
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <a>
              <FaRegCalendarAlt />
              {showText && <span className="ml-2">Calendar</span>}
            </a>
          </li>
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <a>
              <GrIntegration />
              {showText && <span className="ml-2">Integrations</span>}
            </a>
          </li>
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <a>
              <LuBarChart />
              {showText && <span className="ml-2">Statistics</span>}
            </a>
          </li>

          {/* Ícones e textos visíveis em telas maiores */}
          <li className="text-2xl font-light rounded-md hidden lg:flex">
            <a>
              <LuLayoutDashboard /> My business
            </a>
          </li>
          <li className="text-2xl font-light rounded-md hidden lg:flex">
            <a>
              <CiBoxList /> Properties List
            </a>
          </li>
          <li className="text-2xl font-light rounded-md hidden lg:flex">
            <a>
              <FaRegCalendarAlt /> Calendar
            </a>
          </li>
          <li className="text-2xl font-light rounded-md hidden lg:flex">
            <a>
              <GrIntegration /> Integrations
            </a>
          </li>
          <li className="text-2xl font-light rounded-md hidden lg:flex">
            <a>
              <LuBarChart /> Statistics
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
