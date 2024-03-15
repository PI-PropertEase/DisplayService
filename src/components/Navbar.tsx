import { MdKeyboardArrowDown } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
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
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-secondary">
          <div className="flex-none lg:hidden text-2xl text-black">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <RxHamburgerMenu />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <img
              className="h-[5rem]"
              src="./src/assets/logo.png"
              alt="PropertEase Logo"
            />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <img
                  className="h-[3.2rem] w-[3.2rem] rounded-full p-0"
                  src={userData.profilePicUrl}
                  alt="Profile picture"
                />
              </li>
              <li>
                <span className="text-black text-xl">
                  {transformName(userData.name)}
                </span>
              </li>
              <li>
                <span className="text-black">
                  <ToogleDarkMode />
                </span>
              </li>
              <li>
                <span className="text-black text-3xl">
                  <MdKeyboardArrowDown />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Only visible in mobile size */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-secondary">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
