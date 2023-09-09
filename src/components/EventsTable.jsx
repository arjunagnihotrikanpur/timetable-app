import React from "react";

// Random ID Generation
import { v4 as uuid } from "uuid";

const EventsTable = ({ EVENTS, handleDeleteEvent, handleDeleteAll }) => {
  return (
    <>
      <table id="eventsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>Day</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {EVENTS.map((event) => (
            <tr key={uuid().slice(0, 8)}>
              <td>{event.title}</td>
              <td>{event.start}</td>
              <td>{event.end}</td>
              <td>{event.day}</td>
              <td>
                <button
                  className="del-btn"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventsTable;
