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
      
    />
  );
}
