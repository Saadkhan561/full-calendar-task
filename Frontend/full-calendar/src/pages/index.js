import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventForm from "@/components/eventForm";

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
  const [headerToolbar, setHeaderToolbar] = useState({});

  // MODAL STATES
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));

    // CODE FOR HADNELING ADD EVENT BUTTON CONDITIONALLY
    const updateHeaderToolbar = () => {
      if (window.innerWidth > 768) {
        setHeaderToolbar({
          right: "today prev,next myCustomButton",
        });
      } else {
        setHeaderToolbar({
          left: "title",
          right: "today prev,next",
        });
      }
    };

    updateHeaderToolbar();
    window.addEventListener("resize", updateHeaderToolbar);
    return () => {
      window.removeEventListener("resize", updateHeaderToolbar);
    };
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
      <div className="md:w-4/5 w-screen h-screen relative overflow-y-hidden">
        <FullCalendar
          timeZone="UTC"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={headerToolbar}
          customButtons={{
            myCustomButton: {
              text: "Add event",
              click: () => setOpen(true),
            },
          }}
          initialView="dayGridMonth"
          events={events}
          eventContent={handleEventContent}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          height="100%"
          style={{ width: "100%", position: "relative", overflow: "hidden" }}
        />
        <IconButton
          className="absolute bottom-20 right-10 bg-slate-100 mob_screen:hidden z-10 rounded-xl"
          color="primary"
        >
          <AddIcon className="h-8 w-8" />
        </IconButton>
      </div>
      <div>
        <EventForm formState={open} setFormState={setOpen} events={events} />
      </div>
    </div>
  );
}
