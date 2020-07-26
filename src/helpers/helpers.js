import React from "react";

const generateHourColumn = () => {
  const column = [];
  for (let i = 0; i < 24; i++) {
  column.push(<li class="hour-label"><p>{i > 12 ? i % 12 + 'pm' : i + 'am'}</p></li>);
  }
  return column;
}

const generateDaySchedule = () => {
  const schedule = [];
  for (let i = 0; i < 24; i++) {
    schedule.push(<li class="time-slot"><p>+</p></li>);
  }
  return schedule;
}

export { generateDaySchedule, generateHourColumn }