import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import CalendarTimelineView from "../components/CalendarTimelineView"

const Calendar = () => {
    return (
      <div className="h-screen relative">
        <Navbar />
        {/* TODO: epic code :) 0.0001rem is a workaround to hide the drawer in small screens, because this uses grid layout, idk a better solution */}
        <div className="grid grid-cols-[0.0001rem_auto] lg:grid-cols-[16rem_auto] gap-1 h-full">
          <Drawer />
          {/* Main page content (calendar, etc...)*/}
          <CalendarTimelineView />
        </div>
      </div>
    )
}

export default Calendar