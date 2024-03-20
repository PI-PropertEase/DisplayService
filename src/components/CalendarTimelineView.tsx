import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export default function CalendarTimelineView() {
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
      events={[
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
      ]}
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
    />
  );
}
