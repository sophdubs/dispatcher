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
      schedule.push(<li class="time-slot" data-time={i} data-toggle="modal" data-target="#exampleModalLong" onClick={onClickTimeSlot}>+</li>);
    }
  }
  return schedule;
}

const fetchDayTasksForDriver = (schedule, week, day, driver) => {
  let tasks;
  if (schedule[`driver${driver}`][`Week${week}`]) {
    tasks = schedule[`driver${driver}`][`Week${week}`][day] || {};
  } else {
    tasks = {};
  }
  return tasks;
}

const generateCompatibleEndTimes = (startTime, state) => {
  return [4, 5, 6, 7];
}

const showNewTaskForm = (startTime, endTimes) => {
  console.log('haiiii');
  return true;
}

export { generateDaySchedule, generateHourColumn, fetchDayTasksForDriver, generateCompatibleEndTimes, showNewTaskForm }