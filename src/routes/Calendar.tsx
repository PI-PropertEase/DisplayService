import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import {
  CalendarEventInterface,
  CalendarTimelineView,
} from "../components/CalendarTimelineView";
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";

const events: CalendarEventInterface[] = [
  {
    platform: "AirBNB",
    resourceId: "Hotel 1",
    title: "Hotel 1 - Room 4",
    start: "2024-03-14",
    end: "2024-03-25",
  },
  {
    platform: "Booking.com",
    resourceId: "Alojamento Local 1",
    title: "Alojamento Local 1",
    start: "2024-03-13",
    end: "2024-03-26",
  },
  {
    platform: "VRBO",
    resourceId: "Alojamento Local 3",
    title: "Alojamento Local 3",
    start: "2024-03-12",
    end: "2024-03-27",
  },
  {
    platform: "AirBNB",
    resourceId: "Alojamento Local 2",
    title: "Alojamento Local 2",
    start: "2024-03-30",
    end: "2024-04-07",
  },
  {
    platform: "Guesty",
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 2",
    start: "2024-03-11",
    end: "2024-03-22",
  },
  {
    platform: "Expedia",
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 3",
    start: "2024-03-17",
    end: "2024-03-20",
  },
  {
    platform: "TripAdvisor",
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 4",
    start: "2024-03-21",
    end: "2024-03-23",
  },
  {
    platform: "AirBNB",
    resourceId: "Hotel 2",
    title: "Hotel 2 - Room 3",
    start: "2024-03-21",
    end: "2024-03-23",
  },
];

const Calendar = () => {
  const uniquePlatforms = [...new Set(events.map((event) => event.platform))];
  const uniqueProperties = [
    ...new Set(events.map((event) => event.resourceId)),
  ];

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <div className="h-screen relative">
      <Navbar />
      <div className="grid grid-cols-[0.0001rem_auto] lg:grid-cols-[16rem_auto] gap-1 h-full">
        <Drawer />
        {/* Main page content (calendar, etc...)*/}
        <div>
          <div className="flex pt-24 px-4">
            <div className="w-48">
              <h3 className="text-2xl">Platforms</h3>
              <Dropdown
                placeholder="Choose a platform"
                options={uniquePlatforms.sort()}
                onSelect={(platform: string | null) => setSelectedPlatform(platform)}
              />
            </div>
            <div className="w-48">
              <h3 className="text-2xl">Properties</h3>
              <Dropdown
                placeholder="Choose a property"
                options={uniqueProperties.sort()}
                onSelect={(property : string | null) => setSelectedProperty(property)}
              />
            </div>
          </div>
          <CalendarTimelineView
            properties={events.filter(
              (event) =>
                (!selectedPlatform || event.platform === selectedPlatform) &&
                (!selectedProperty || event.resourceId === selectedProperty)
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
