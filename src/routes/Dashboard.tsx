import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import PropertyListDashboard from "../components/PropertyListDashboard"
import WeekCalendar from "../components/WeekCalendar"
import { IUser } from "../types/UserType"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useQuery } from "react-query"
import { fetchUser } from "../services/Integrations.service"

const Dashboard = () => {
  const authHeader = useAuthHeader() ?? ""
  const { data: user } = useQuery<IUser>("user", () => fetchUser(authHeader).then((data) => data), {
    staleTime: Infinity,
  })

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Drawer />
          {(user?.connected_services?.length ?? 0) == 0 ? (
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
                
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
