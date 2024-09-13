import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventForm from "@/components/eventForm";

// APIs IMPORTS
import { deleteEvent, getEvents } from "@/services/event.service";
import { updateEvent } from "@/services/event.service";
import { Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  // STATE FOR FRONTEND IMPLEMENTATION
  // const [events, setEvents] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const storedEvents = localStorage.getItem("events");
  //     return storedEvents
  //       ? JSON.parse(storedEvents)
  //       : [];
  //   }
  // });

  // STATE FOR FULL STACK IMPLEMENTATION
  const [events, setEvents] = useState([])

  // FULL CALENDAR TOOLBAR STATE
  const [headerToolbar, setHeaderToolbar] = useState({});

  // MODAL STATES
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // FOR STORING EVENTS IN LOCALSTORAGE
    // localStorage.setItem("events", JSON.stringify(events));

    // FETCHING EVENTS FROM DATABASE
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents()

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
  }, []);


  const deleteOneEvent = (id) => {
    deleteEvent(id)
    toast.success("Event deleted successfully!", {
      position: "top-center",
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  }

  // FUNCTION TO HANDLE EVENTS DISPLAYING ON CALENDAR
  const handleEventContent = (eventInfo) => {
    const id = eventInfo.event.extendedProps._id
    const formattedTime = `${eventInfo.event.start.toTimeString().slice(0, 5)} - ${eventInfo.event.end.toTimeString().slice(0, 5)}`;
    return (
      <div className="flex justify-between items-center bg-blue-500 text-white p-1 rounded-lg">
        <div>
          <p>{eventInfo.event.title}</p>
          <p>{formattedTime}</p>
        </div>
        {/* DELETE OPTION TO DELETE FROM THE DATABASE */}
        <div onClick={() => deleteOneEvent(id)} className="p-1 rounded-full  cursor-pointer hover:bg-blue-400 duration-200">
          <Trash className="h-4 w-4" />
        </div>
      </div>
    );
  };

  // // FUNCTION TO HANDLE THE EVENT CHANGING ON CALENDAR BY DRAGGING AND DROPPING (LOCAL STORAGE)
  // const handleEventDrop = (eventDropInfo) => {
  //   const updatedEvents = events.map((event) => {
  //     if (event.id === parseInt(eventDropInfo.event.id)) {
  //       return {
  //         ...event,
  //         start: eventDropInfo.event.start.toISOString().replace('Z', ''),
  //         end: eventDropInfo.event.end.toISOString().replace('Z', ''),
  //       };
  //     }
  //     return event;
  //   });

  //   console.log("updated events", updatedEvents);
  //   setEvents(updatedEvents);

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("events", JSON.stringify(updatedEvents));
  //   }
  // };


  // FUNCTION TO HANDLE THE EVENT CHANGING ON CALENDAR BY DRAGGING AND DROPPING (MONGO DB)
  const handleEventDrop = async (eventDropInfo) => {
    updateEvent({ id: eventDropInfo.event.extendedProps._id, newStart: eventDropInfo.event.start, newEnd: eventDropInfo.event.end })
  };

  return (
    <div className="flex justify-center items-center relative">
      <ToastContainer
      />
      <div className="md:w-4/5 w-screen h-screen relative overflow-y-hidden">
        <FullCalendar
          timeZone="local"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={headerToolbar}
          customButtons={{
            myCustomButton: {
              text: "Add event",
              click: () => setOpen(true),
            },
          }}
          initialView="timeGridDay"
          events={events}
          eventContent={handleEventContent}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          height="100%"

          style={{ width: "100%", position: "relative", overflow: "hidden" }}
        />
        <IconButton
          onClick={setOpen}
          className="absolute bottom-20 right-10 bg-slate-100 mob_screen:hidden z-10 rounded-xl"
          color="primary"
        >
          <AddIcon className="h-8 w-8" />
        </IconButton>
      </div>
      <div>
        <EventForm formState={open} setFormState={setOpen} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
