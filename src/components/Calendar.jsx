import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Firebase
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/Firebase";

const Calendar = () => {
  const [EVENTS, setEVENTS] = useState([]);

  // Function to Get Events from DB
  const getAllEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    let e = [];
    querySnapshot.forEach((doc) => {
      e.push(doc.data());
    });
    setEVENTS(e);
    console.log(e);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        // initialView={"timeGridDay"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={EVENTS}
        height={"90vh"}
      />
    </div>
  );
};

export default Calendar;

// Documentation
// https://fullcalendar.io/docs/react

// TODO
// ADD FIREBASE FUNCTIONALITY
