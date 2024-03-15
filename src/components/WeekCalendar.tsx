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
            end: "2024-03-15"
          },
          {
            title: "Alojamento Local 1",
            start: "2024-03-13",
            end: "2024-03-16"
          },
          {
            title: "Alojamento local 3",
            start: "2024-03-12",
            end: "2024-03-17"
          },
          {
            title: "Hotel 2 - Room 2",
            start: "2024-03-11",
            end: "2024-03-12"
          }
        ]
      } 
    />
  );
}
