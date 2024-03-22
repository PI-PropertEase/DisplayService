import { MdKeyboardArrowDown } from "react-icons/md";
import ToogleDarkMode from "./ToogleDarkMode";

export default function Navbar() {
  const userData = {
    name: "Alice Zuquete",
    profilePicUrl:
      "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=2105&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  /*
    Transforms "Alice Blabla Bob." into "Alice B."
  */
  function transformName(name: string): string {
    const nameParts = name.split(" ");
    return nameParts[0] + " " + nameParts[nameParts.length - 1][0] + ".";
  }

  return (
    <>
      <div className="navbar bg-secondary z-20">
        <div className="flex-1">
          <img
                className="h-24 pl-16"
                src="/src/assets/logo.png"
                alt="PropertEase Logo"
          />
        </div>
        <div className="flex flex-row gap-8">
          <ToogleDarkMode />

          <div tabIndex={0} role="button" className=" avatar">
              <div className="w-10 rounded-full ">
                <img
                    src={userData.profilePicUrl}
                    alt="Profile picture"
                  />
              </div>
          </div>
          <span className="text-black text-xl"> {transformName(userData.name)}</span>

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
              <li><a>Logout</a></li>
            </ul>
          </div>
         
        </div>
      </div>
      
    </>
   
  );
}
