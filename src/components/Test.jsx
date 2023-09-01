import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import "./Test.css";
import { dayOptions } from "../constants/constants";

import { convertDateFormat, generateEvents } from "../constants/misc";

const Test = () => {
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

  const handleSubmit = () => {
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

    const events = generateEvents(
      eventName,
      startTime,
      endTime,
      selectedDay.value,
      newStartDate,
      newEndDate
    );

    console.log(events);
  };

  return (
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Test;
