import React, { useState, useEffect } from "react";

// Calendar Imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Random ID Generation
import { v4 as uuid } from "uuid";

// CSS
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./admin.css";

// Date Picker
import DatePicker from "react-datepicker";

// Timepicker
import TimePicker from "react-time-picker";

// Dropdown
import Select from "react-select";

// Dropdown options
import { dayOptions } from "../constants/constants";

// Misc Functions
import { convertDateFormat, generateEvents } from "../constants/misc";

// Firebase
import {
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/Firebase";

// Custom Components
import EventsTable from "./EventsTable";

const AdminCalendar = () => {
  // List of all events
  const [EVENTS, setEVENTS] = useState([]);

  // Compressed List of All Events
  const [dbEvents, setDbEvents] = useState([]);

  // State to show or hide event add form
  const [showForm, setShowForm] = useState(false);

  // State to show or hide events list
  const [showEventsList, setShowEventsList] = useState(true);

  // new event states
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [selectedDay, setSelectedDay] = useState();
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [eventName, setEventName] = useState("");

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

  // Get events from db on pageload
  useEffect(() => {
    getAllEvents();
  }, []);

  // new function to add event to DB
  const addEvent = async (title, day, start, end, startDate, endDate) => {
    const newEvent = {
      id: uuid().slice(0, 8),
      title,
      start,
      day,
      end,
      startDate,
      endDate,
    };
    // Add to DB
    try {
      await setDoc(doc(db, "classes", newEvent.id), newEvent);
    } catch (err) {
      alert("err");
    }
  };

  // Function to delete event (from db too)
  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "classes", id));
    } catch (err) {
      alert("err");
    }
    getAllEvents();
  };

  // funciton to compress event format
  const createEventList = (events) => {
    // check which day is event and put it in ab object
    // FORMAT
  };

  // function called on adding new event
  const handleSubmit = () => {
    // FORMAT
    // const events = generateEvents(
    //   "Conference",
    //   "10:00",
    //   "11:00",
    //   "Monday",
    //   "2023-08-01",
    //   "2023-08-10"
    // );

    const newStartDate = convertDateFormat(startDate);
    const newEndDate = convertDateFormat(endDate);
    const e = {
      title: eventName,
      start: startTime,
      end: endTime,
      day: selectedDay.value,
      startDate: newStartDate,
      endDate: newEndDate,
    };

    addEvent(e.title, e.day, e.start, e.end, e.startDate, e.endDate);

    getAllEvents();

    setShowForm(false);
  };

  return (
    <div>
      <div style={{ height: "100%", margin: "20px" }}>
        <h3>Schedule Manager</h3>

        {/* Form to add Event */}
        {showForm ? (
          <div className="container">
            <div>
              <h3>From</h3>
              <DatePicker
                selected={startDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div>
              <h3>To</h3>
              <DatePicker
                selected={endDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
            <div>
              <h3>Day</h3>
              <Select
                options={dayOptions}
                onChange={(selected) => setSelectedDay(selected)}
              />
            </div>
            <div>
              Start Time
              <TimePicker onChange={(e) => setStartTime(e)} value={startTime} />
            </div>
            <div>
              End Time
              <TimePicker onChange={(e) => setEndTime(e)} value={endTime} />
            </div>
            <div>
              <input
                placeholder="name..."
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="del-btn"
              onClick={() => {
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="showform-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add event
          </button>
        )}

        {/* List of Events */}
        {EVENTS.length > 0 ? (
          showEventsList ? (
            <div>
              <button className="btn" onClick={() => setShowEventsList(false)}>
                Hide List
              </button>
              <EventsTable
                EVENTS={dbEvents}
                handleDeleteEvent={handleDeleteEvent}
              />
            </div>
          ) : (
            <button className="btn" onClick={() => setShowEventsList(true)}>
              Show List
            </button>
          )
        ) : (
          <p>No Events to Display!</p>
        )}
      </div>
      <div>
        {/* Calendar */}
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
    </div>
  );
};

export default AdminCalendar;
