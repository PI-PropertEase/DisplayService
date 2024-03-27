import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import {
  CalendarEventInterface,
  CalendarTimelineView,
} from "../components/CalendarTimelineView";
import { Dropdown } from "../components/Dropdown";

const events: CalendarEventInterface[] = [
  {
    resourceId: "Hotel 1",
    title: "Hotel 1 - Room 4",
    start: "2024-03-14",
    end: "2024-03-25",
  },
  {
    resourceId: "Alojamento Local 1",
    title: "Alojamento Local 1",
    start: "2024-03-13",
    end: "2024-03-26",
  },
  {
    resourceId: "Alojamento Local 3",
    title: "Alojamento Local 3",
    start: "2024-03-12",
    end: "2024-03-27",
  },
  {
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 2",
    start: "2024-03-11",
    end: "2024-03-22",
  },
  {
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 3",
    start: "2024-03-17",
    end: "2024-03-20",
  },
  {
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 4",
    start: "2024-03-21",
    end: "2024-03-23",
  },
  {
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 3",
    start: "2024-03-21",
    end: "2024-03-23",
  },
];

const Calendar = () => {
  return (
    <div className="h-screen relative">
      <Navbar />
      {/* TODO: epic code :) 0.0001rem is a workaround to hide the drawer in small screens, because this uses grid layout, idk a better solution */}
      <div className="grid grid-cols-[0.0001rem_auto] lg:grid-cols-[16rem_auto] gap-1 h-full">
        <Drawer />
        {/* Main page content (calendar, etc...)*/}
        <div>
          <div className="flex pt-24 px-4">
            <div className="w-48">

          <h3 className="text-2xl">Platforms</h3>
            {/* <details className="dropdown">
              <summary className="m-1 btn calendar-filter">Choose a platform</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </details> */}
            <Dropdown placeholder="Choose a platform" options={["AirBNB", "Booking.com", "VRBO", "TripAdvisor", "Expedia", "Guesty"]}/>
            </div>
            <div className="w-48">
              <h3 className="text-2xl">Properties</h3>
              <Dropdown placeholder="Choose a property" options={["Hotel 1", "Hotel 2", "Alojamento Local 1", "Alojamento Local 2", "Alojamento Local 3"]}/>
            </div>
          </div>
          <CalendarTimelineView properties={events} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
