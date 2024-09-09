import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      const storedEvents = localStorage.getItem("events");
      return storedEvents
        ? JSON.parse(storedEvents)
        : [
            { id: 1, title: "event 1", date: "2024-09-09" },
            { id: 2, title: "event 2", date: "2024-09-10" },
            { id: 3, title: "event 3", date: "2024-09-11" },
          ];
    }
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // FUNCTION TO HANDLE EVENTS DISPLAYING ON CALENDAR
  const handleEventContent = (eventInfo) => {
    const formattedDate = eventInfo.event.start.toISOString().split("T")[0];
    return (
      <div>
        <p>{eventInfo.event.title}</p>
        <p>{formattedDate}</p>
      </div>
    );
  };

  // FUNCTION TO HANDLE THE EVENT CHANGING ON CALENDAR BY DRAGGING AND DROPPING
  const handleEventDrop = (eventDropInfo) => {
    const updatedEvents = events.map((event, index) => {
      if (event.id === parseInt(eventDropInfo.event.id)) {
        return {
          ...event, 
          date: eventDropInfo.event.start.toISOString().split("T")[0], 
        };
      }
      return event;
    });

    console.log("updated events", updatedEvents); 
    setEvents(updatedEvents); 

    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(updatedEvents)); 
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/5 h-screen">
        <FullCalendar
          timeZone="UTC"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={handleEventContent}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          height="80%"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
