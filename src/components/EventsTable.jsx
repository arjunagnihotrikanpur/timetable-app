import React from "react";

const EventsTable = ({ EVENTS, handleDeleteEvent, handleDeleteAll }) => {
  return (
    <>
      <table id="eventsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>
              <button className="table-btn" onClick={handleDeleteAll}>
                Delete All
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {EVENTS.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.normalStart}</td>
              <td>{event.normalEnd}</td>
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
