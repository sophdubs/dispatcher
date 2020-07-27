import React from "react";
import Task from "../components/Task";
import New from "../components/New";

const generateHourColumn = () => {
  const column = [];
  for (let i = 0; i < 24; i++) {
  column.push(<li class="hour-label"><p>{i > 12 ? i % 12 + 'pm' : i + 'am'}</p></li>);
  }
  return column;
}

const generateDaySchedule = (tasks, onClickTimeSlot) => {
  const schedule = [];
  for (let i = 0; i < 24; i++) {
    if (tasks[i]) {
      const {start_time, end_time, task} = tasks[i];
      schedule.push(<Task start_time={start_time} end_time={end_time} task={task}/>);
      i += end_time - start_time - 1;
    } else {
      schedule.push(<li class="time-slot" data-time={i} data-toggle="modal" data-target="#newTaskForm" onClick={onClickTimeSlot}>+</li>);
    }
  }
  return schedule;
}

const fetchDayTasksForDriver = (schedule, week, day, driver) => {
  console.log({schedule, week, driver, day});
  let tasks;
  if (schedule[`driver${driver}`][`Week${week}`]) {
    tasks = schedule[`driver${driver}`][`Week${week}`][day] || {};
  } else {
    tasks = {};
  }
  return tasks;
}

const parseTimeString = time => {
  return time > 12 ? `${time - 12}pm` : `${time}am`;
}

const generateCompatibleEndTimeOptions= (state) => {
  const todayTasks = fetchDayTasksForDriver(state.schedule, state.week, state.day, state.driver);
  const options = [];
  let possibleEndTime = parseInt(state.selectedTimeSlot);
  while (possibleEndTime <= 24 && !todayTasks[possibleEndTime]) {
    options.push(<option value={possibleEndTime + 1}>{parseTimeString(possibleEndTime + 1)}</option>);
    possibleEndTime++;
  }
  return options;
}


export { generateDaySchedule, generateHourColumn, fetchDayTasksForDriver, generateCompatibleEndTimeOptions, parseTimeString }