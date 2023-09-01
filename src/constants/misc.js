export const convertDateFormat = (inputDate) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  let date = inputDate.toLocaleDateString("en-IN", options).replace(/\//g, "-");
  const parts = date.split("-");
  const year = parts[2];
  const month = parts[1];
  const day = parts[0];
  return `${year}-${month}-${day}`;
};

export const generateEvents = (
  name,
  startTime,
  endTime,
  day,
  startDate,
  endDate
) => {
  const events = [];

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDayIndex = daysOfWeek.indexOf(day);

  while (startDateTime <= endDateTime) {
    const currentDayIndex = startDateTime.getUTCDay();

    if (currentDayIndex === targetDayIndex) {
      const formattedDate = startDateTime.toISOString().slice(0, 10);
      const startEventTime = new Date(`${formattedDate}T${startTime}:00Z`);
      const endEventTime = new Date(`${formattedDate}T${endTime}:00Z`);

      events.push({
        title: name,
        start: startEventTime.toISOString().slice(0, -8),
        end: endEventTime.toISOString().slice(0, -8),
        normalStart: startTime,
        normalEnd: endTime,
      });
    }

    startDateTime.setUTCDate(startDateTime.getUTCDate() + 1);
  }

  return events;
};
