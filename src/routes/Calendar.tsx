import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import { CalendarTimelineView } from "../components/CalendarTimelineView"
import { Dropdown } from "../components/Dropdown"
import { useContext, useState } from "react"
import { ReservationContext } from "../context/ReservationContext"
import { PropertyContext } from "../context/PropertyContext"
import { CalendarEventInterface } from "../types/CalendarTypes"
import { convertToCalendarInterface } from "../utils/calendar_utils"

const Calendar = () => {
  const { reservations } = useContext(ReservationContext)
  const { properties } = useContext(PropertyContext)

  const events: CalendarEventInterface[] = convertToCalendarInterface(reservations, properties)

  const uniquePlatforms = [...new Set(events.map((event) => event.platform))]
  const uniqueProperties = [...new Set(events.map((event) => event.resourceId))]

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-1 h-full">
        <Drawer />
        {/* Main page content (calendar, etc...)*/}
        <div className="flex flex-col flex-1 p-8 overflow-auto pt-28">
          <div className="flex flex-row px-4 gap-8">
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
  )
}

export default Calendar
