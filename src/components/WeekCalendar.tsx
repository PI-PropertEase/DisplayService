import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

export default function WeekCalendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      headerToolbar={{
        left: "title",
        end: "prev today next"
      }}
      height={"100%"}
      buttonIcons={{prev: 'chevron-left', next: 'chevron-right'}}
      events={
        [
          {
            title: "Hotel 1 - Room 4",
            start: "2024-03-14",
            end: "2024-03-25"
          },
          {
            title: "Alojamento Local 1",
            start: "2024-03-13",
            end: "2024-03-26"
          },
          {
            title: "Alojamento Local 3",
            start: "2024-03-12",
            end: "2024-03-27"
          },
          {
            title: "Hotel 2 - Room 2",
            start: "2024-03-11",
            end: "2024-03-22"
          },
          {
            title: "Hotel 2 - Room 3",
            start: "2024-03-17",
            end: "2024-03-20"
          },
          {
            title: "Hotel 2 - Room 4",
            start: "2024-03-21",
            end: "2024-03-23"
          },
          {
            title: "Hotel 2 - Room 3",
            start: "2024-03-21",
            end: "2024-03-23"
          },
        ]
      }
      eventColor="#FD642395"
      eventBorderColor="#FD642395"
      eventTextColor="#000000"
    />
  );
}
