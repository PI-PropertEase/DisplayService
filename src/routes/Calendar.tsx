import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import { CalendarTimelineView } from "../components/CalendarTimelineView"
import { Dropdown } from "../components/Dropdown"
import { useContext, useState } from "react"
import { PropertyContext } from "../context/PropertyContext"
import { CalendarEventInterface } from "../types/CalendarTypes"
import { convertToCalendarInterface } from "../utils/calendar_utils"
import { EventContext } from "../context/EventContext"

const Calendar = () => {
  const { events } = useContext(EventContext)
  const { properties } = useContext(PropertyContext)

  const calendarEvents: CalendarEventInterface[] = convertToCalendarInterface(events, properties)

  const uniquePlatforms = [...new Set(calendarEvents.filter(e => e.platform !== null).map((event) => event.platform))]
  const uniqueProperties = [...new Set(calendarEvents.map((event) => event.resourceId))]

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 h-full">
        <Drawer />
        {/* Main page content (calendar, etc...)*/}
        <div className="flex flex-col flex-1 p-8 overflow-auto pt-28">
          <div className="px-4">
            <h1 className="text-accent text-2xl font-semibold">Calendar</h1>
            <p className="font-light mb-4">This page allows you to view a calendar with all reservations and cleaning/maintenance events on your properties. <span>You can scroll horizontally</span>.</p>
          </div>
          <div className="flex flex-row px-4 gap-8 items-center">
            <h3 className="text-2xl">Platforms</h3>
            <Dropdown
              placeholder="Choose a platform"
              options={uniquePlatforms.sort()}
              onSelect={(platform: string | null) => setSelectedPlatform(platform)}
            />
            <h3 className="text-2xl">Properties</h3>
            <Dropdown
              placeholder="Choose a property"
              options={uniqueProperties.sort()}
              onSelect={(property: string | null) => setSelectedProperty(property)}
            />
            <div className="mr-0 ml-auto flex flex-row gap-5">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#1d447d]"></div>
                <h4>- Zooking</h4>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#ff5a5f]"></div>
                <h4>- ClickAndGo</h4>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#33e0a1]"></div>
                <h4>- Earthstayin</h4>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#FD6423]"></div>
                <h4>- Cleaning/Maintenance events</h4>
              </div>
            </div>
          </div>
          <CalendarTimelineView
            properties={calendarEvents.filter(
              (event) =>
                (!selectedPlatform || event.platform === selectedPlatform) &&
                (!selectedProperty || event.resourceId === selectedProperty)
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Calendar
