import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Drawer() {
  const [showText, setShowText] = useState(false);

  const toggleShowText = () => {
    setShowText(!showText);
  };

  return (
    <div className="" onMouseEnter={toggleShowText} onMouseLeave={toggleShowText} >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" defaultChecked />
      <div className="h-screen">
        <ul className="menu h-full bg-primary flex flex-col gap-8 text-white shadow-lg">
          <Link to="/dashboard">
          <li
            className="text-2xl font-light rounded-md lg:hidden mt-24"
            
          >
            
            <p>
              <LuLayoutDashboard />
              {showText && <span className="ml-2">My business</span>}
            </p>
            
          </li>
          </Link>
          <Link to="/properties">
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            
            <p>
              <CiBoxList />
              {showText && <span className="ml-2">Properties List</span>}
            </p>
          </li>
          </Link>
          <Link to="/calendar">
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <p>
              <FaRegCalendarAlt />
              {showText && <span className="ml-2">Calendar</span>}
            </p>
          </li>
          </Link>
          <Link to="/integrations">
          <li
            className="text-2xl font-light rounded-md lg:hidden"
            
          >
            <p>
              <GrIntegration />
              {showText && <span className="ml-2">Channel Manager</span>}
            </p>
          </li>
          </Link>

          {/* Ícones e textos visíveis em telas maiores */}
          <Link to="/dashboard">
          <li className="text-2xl font-light rounded-md hidden lg:flex gap-2">
            <p>
              <LuLayoutDashboard /> My business
            </p>
          </li>
          </Link>
          <Link to="/properties">
          <li className="text-2xl font-light rounded-md hidden lg:flex gap-2">
            <p>
              <CiBoxList /> Properties List
            </p>
          </li>
          </Link>
          <Link to="/calendar">
          <li className="text-2xl font-light rounded-md hidden lg:flex gap-2">
            <p>
              <FaRegCalendarAlt /> Calendar
            </p>
          </li>
          </Link>
          <Link to="/integrations">
          <li className="text-2xl font-light rounded-md hidden lg:flex gap-2">
            <p>
              <GrIntegration /> Channel Manager
            </p>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
