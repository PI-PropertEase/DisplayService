import ToogleDarkMode from "../components/ToogleDarkMode";
import { IoLink } from "react-icons/io5";
import { BsGraphUpArrow, BsTagsFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartPieSliceFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { handleFirebaseLogin } from "../utils/firebase";
import axios from "axios";
import { IUser } from "../types/UserType";

export default function Home() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignIn = async () => {
    const result = await handleFirebaseLogin();

    if (result) {
      const idToken = await result.user.getIdToken();

      try {
        const res = await axios.get(
          "http://localhost:4040/api/UserService/users",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const user_data = res.data as IUser;
        if (
          signIn({
            auth: {
              token: idToken,
              type: "Bearer",
            },
            //refresh: result.user.refreshToken,
            userState: {
              email: user_data.email,
              id: user_data.id,
              connected_services: user_data.connected_services,
            },
          })
        ) {
          navigate("/dashboard");
        } else {
          console.error("Failure signing in with react auth kit");
        }
      } catch (error) {
        console.log("Error occured during authentication: ", error);
      }
    }
  };

  const handleSignUp = async () => {
    const result = await handleFirebaseLogin();

    if (result) {
      const idToken = await result.user.getIdToken();

      try {
        // Create user in backend
        const res = await axios.post(
          "http://localhost:4040/api/UserService/users",
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        if (res.status != 201) {
          console.error("Error occurred while signing up: ", res);
          return;
        }

        const user_data = res.data as IUser;
        if (
          signIn({
            auth: {
              token: idToken,
              type: "Bearer",
            },
            //refresh: result.user.refreshToken,
            userState: {
              email: user_data.email,
              id: user_data.id,
              connected_services: user_data.connected_services,
            },
          })
        ) {
          navigate("/dashboard");
        } else {
          console.error("Failure signing in with react auth kit");
        }
      } catch (error) {
        console.log("Error occured during authentication: ", error);
      }
    }
  };

  return (
    <>
      <div className="fixed w-full bg-secondary flex flex-row items-center justify-between px-4">
        <img src="./src/assets/logo.png" alt="logo" className="max-h-24 m-2" />
        <ToogleDarkMode />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center py-32 gap-24 px-8">
        <div className="md:w-1/2 flex flex-col gap-16">
          <h1 className="text-6xl md:text-4xl xl:text-6xl font-bold">
            Unlock Your Property&apos;s Potential with PropertEase!
          </h1>
          <p className="text-2xl font-light">
            With PropertEase, you will automate processes and maximize profit,
            while minimizing effort required.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={async () => {
                await handleSignUp();
              }}
              className="btn btn-outline btn-primary btn-lg md:btn-wide text-2xl font-light"
            >
              Sign Up
            </button>
            <button
              onClick={async () => {
                await handleSignIn();
              }}
              className="btn btn-primary btn-lg md:btn-wide text-2xl font-light"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="">
          <figure className="">
            <img
              src="./src/assets/imgHomePage.png"
              alt="PropertEase"
              className="rounded-3xl shadow shadow-base-200 h-192"
            />
          </figure>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center px-10 sm:px-10 md:px-20 lg:px-24 xl:px-40">
        <div>
          <h1 className="text-6xl font-bold text-center">
            Simplify property management
          </h1>
          <p className="text-3xl font-light mt-10  text-center">
            Automate the boring stuff and focus your business
          </p>
          <div className="stats shadow shadow-base-200 mt-20 mb-32 ">
            <div className="stats-vertical ">
              <div className="stat place-items-center">
                <IoLink size={50} />
                <p className="font-bold text-xl mt-4">
                  Connect to your services
                </p>
                <p className="text-center mt-4">
                  Connect your PropertEase account to services where your
                  properties are listed, and manage them in our central service.
                </p>
              </div>
              <div className="stat place-items-center">
                <FaRegCalendarAlt size={50} />
                <p className="font-bold text-xl mt-4">Calendar Sync</p>
                <p className="text-center mt-4">
                  PropertEase was designed to reduce manual work by syncing all
                  reservations from different listing websites.
                </p>
              </div>
            </div>
            <div className="stats-vertical ">
              <div className="stat place-items-center">
                <BsGraphUpArrow size={50} />
                <p className="font-bold text-xl mt-4">Grow your business</p>
                <p className="text-center mt-4">
                  With PropertEase you can focus on growing your business
                  without the complexities of managing properties on different
                  platforms.
                </p>
              </div>
              <div className="stat place-items-center">
                <LuLayoutDashboard size={50} />
                <p className="font-bold text-xl mt-4">
                  User-friendly dashboard
                </p>
                <p className="text-center mt-4">
                  Ease Property Management through a user-friendly dashboard
                </p>
              </div>
            </div>
            <div className="stats-vertical ">
              <div className="stat place-items-center">
                <BsTagsFill size={50} />
                <p className="font-bold text-xl mt-4">Dynamic Prices</p>
                <p className="text-center mt-4">
                  Get data-driven price recommendations based on your properties
                  characteristics, on a daily basis.
                </p>
              </div>
              <div className="stat place-items-center">
                <PiChartPieSliceFill size={50} />
                <p className="font-bold text-xl mt-4">Statistics</p>
                <p className="text-center mt-4">
                  Allow us to show you statistics data to help you manage your
                  business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
