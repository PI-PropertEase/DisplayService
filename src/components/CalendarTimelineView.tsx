import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export interface CalendarEventInterface {
  platform: string
  resourceId: string
  title: string
  start: string
  end: string
}

export function CalendarTimelineView({properties} : {properties: CalendarEventInterface[]}) {
  const uniqueProperties = [...new Set(properties.map((property) => property.resourceId)).values()];

  return (
    <FullCalendar
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
      resourceGroupField="id"
      resources={uniqueProperties.map((property) => ({ id: property }))}
      events={properties}
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
    />
  );
}
