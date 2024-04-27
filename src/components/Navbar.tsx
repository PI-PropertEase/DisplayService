import { MdKeyboardArrowDown } from "react-icons/md";
import ToogleDarkMode from "./ToogleDarkMode";
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { IUserState } from "../types/UserType";

export default function Navbar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const userData = useAuthUser<IUserState>();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  }


  return (
    <>
      <div className="navbar bg-secondary fixed z-20">
        <div className="flex-1">
          <img
                className="h-16 pl-4"
                src="/src/assets/logo.png"
                alt="PropertEase Logo"
          />
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
            <a><b>{userData?.name}</b></a>
              <ul className="p-2">
                <li><a>Settings</a></li>
                <li><button onClick={() => signOut()}>Logout</button></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex-row gap-8 hidden lg:flex">
          
          <div tabIndex={0} role="button" className=" avatar">
              <div className="w-10 rounded-full ">
                <img
                    src={userData?.photoURL}
                    alt="Profile picture"
                    referrerPolicy="no-referrer"
                  />
              </div>
          </div>
          <span className="text-black text-xl"> {userData?.name}</span>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <span className="text-black text-3xl "><MdKeyboardArrowDown/></span>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a >
                  Profile
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><button onClick={() => handleSignOut()}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="px-4">
          <ToogleDarkMode />
        </div>
      </div>
      
    </>
   
  );
}
