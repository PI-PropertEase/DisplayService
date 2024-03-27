import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export interface CalendarEventInterface {
  resourceId: string
  title: string
  start: string
  end: string
}

export function CalendarTimelineView({properties} : {properties: CalendarEventInterface[]}) {
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
      resources={[
        { id: "Hotel 1" },
        { id: "Hotel 2" },
        { id: "Alojamento Local 1" },
        { id: "Alojamento Local 2" },
        { id: "Alojamento Local 3" },
      ]}
      events={properties}
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
    />
  );
}
