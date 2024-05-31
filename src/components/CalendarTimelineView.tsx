import FullCalendar from "@fullcalendar/react"
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"
import { CalendarEventInterface } from "../types/CalendarTypes"
import { ServiceEnum } from "../types/UserType"

export function CalendarTimelineView({ properties }: { properties: CalendarEventInterface[] }) {
  const uniqueProperties = [...new Set(properties.map((property) => property.resourceId)).values()]

  const platformColor = {
    [ServiceEnum.ZOOKING]: "#1d447d",
    [ServiceEnum.CLICKANDGO]: "#ff5a5f",
    [ServiceEnum.EARTHSTAYIN]: "#33e0a1"
  }

  return (
      <FullCalendar
        viewClassNames={"h-[40rem]"}
        plugins={[resourceTimelinePlugin]}
        initialView="resourceTimeline"
        // headerToolbar={{
        //   left: "title",
        //   end: "prev today next",
        // }}
        // height={"100%"}
        // buttonIcons={{ prev: "chevron-left", next: "chevron-right" }}
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "resourceTimelineDay,resourceTimelineWeek",
        }}
        resourceAreaWidth={"20%"}
        resources={uniqueProperties.map((property) => ({ id: property }))}
        events={properties.map((event) => ({
          ...event,
          color: platformColor[event.platform] ?? "#FD6423",
          textColor: "#FFFFFF"
        }))}
        eventBorderColor="#FD6423"
        eventTextColor="#000000"
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      />
  )
}
