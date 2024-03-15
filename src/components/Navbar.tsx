import * as React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const userData = {
    name: "Alice Zuquete",
    profilePicUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-220453.jpg%26fm%3Djpg&f=1&nofb=1&ipt=1c05cba628c6529df1cc657a69aa26675817a569bd441dd2cbb3afe87d01aff8&ipo=images",
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
                  className="h-[3.2rem]"
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
