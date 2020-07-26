import React from "react";
import Task from "../components/Task";

const generateHourColumn = () => {
  const column = [];
  for (let i = 0; i < 24; i++) {
  column.push(<li class="hour-label"><p>{i > 12 ? i % 12 + 'pm' : i + 'am'}</p></li>);
  }
  return column;
}

const generateDaySchedule = (tasks) => {
  const schedule = [];
  for (let i = 0; i < 24; i++) {
    if (tasks[i]) {
      const {start_time, end_time, task} = tasks[i];
      schedule.push(<Task start_time={start_time} end_time={end_time} task={task}/>);
      i += end_time - start_time - 1;
    } else {
      schedule.push(<li class="time-slot"><p>+</p></li>);
    }
  }
  return schedule;
}

export { generateDaySchedule, generateHourColumn }