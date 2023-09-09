import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Firebase
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/Firebase";

// Misc Functions
import { convertDateFormat, generateEvents } from "../constants/misc";

const Calendar = () => {
  const [EVENTS, setEVENTS] = useState([]);
  // Compressed List of All Events
  const [dbEvents, setDbEvents] = useState([]);

  // Function to Get Events from DB
  const getAllEvents = async () => {
    setEVENTS([]);
    const querySnapshot = await getDocs(collection(db, "classes"));
    let e = [];
    querySnapshot.forEach((doc) => {
      e.push(doc.data());
    });

    setDbEvents(e);

    let allEvents = [];

    e.forEach((el) => {
      let events = generateEvents(
        el.id,
        el.title,
        el.start,
        el.end,
        el.day,
        el.startDate,
        el.endDate
      );
      events.forEach((event) => allEvents.push(event));
    });

    console.log(allEvents);
    setEVENTS(allEvents);
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
