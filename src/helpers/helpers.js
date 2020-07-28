import React from "react";
import Task from "../components/Task";

const generateHourColumn = () => {
  const column = [];
  for (let i = 0; i < 24; i++) {
  column.push(<li class="hour-label"><p>{i > 12 ? i % 12 + 'pm' : i + 'am'}</p></li>);
  }
  return column;
}

const generateDaySchedule = (tasks, onClickTimeSlot, onClickTask) => {
  const schedule = [];
  for (let i = 0; i < 24; i++) {
    if (tasks[i]) {
      const {start_time, end_time, task, location} = tasks[i];
      schedule.push(<Task onClickTask={onClickTask} start_time={start_time} end_time={end_time} task={task} location={location}/>);
      i += end_time - start_time - 1;
    } else {
      schedule.push(<li class="time-slot" data-time={i} data-toggle="modal" data-target="#newTaskForm" onClick={onClickTimeSlot}>+</li>);
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

const addTaskToSchedule = (newTask, state, setState) => {
  setState(state => {
    if (state.schedule[`driver${state.driver}`][`Week${state.week}`]) {
      if(state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`]) {
        state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`][`${state.selectedTimeSlot}`] = newTask;
      } else {
        state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`] = {
          [`${state.selectedTimeSlot}`]: newTask
        }
      }
    } else {
      state.schedule[`driver${state.driver}`][`Week${state.week}`] = {
        [`${state.day}`]: {
          [`${state.selectedTimeSlot}`]: newTask
        }
      }
    }
    return state;
  });
};

const createNewTask = (endTime, task, state, location) => {
  const newTask = {
    start_time: state.selectedTimeSlot,
    end_time: parseInt(endTime),
    task,
    location
  };
  return newTask;
}

const wipeSelectedFields = (state, setState) => {
  const day = null;
  const selectedTimeSlot = null;
  setState({...state, day, selectedTimeSlot});
};

const fetchSelectedTask = (day, week, driver, selectedTimeSlot, state) => {
  const task = state.schedule[`driver${driver}`][`Week${week}`][day][selectedTimeSlot];
  return task;
}

const deleteTask = (state, setState) => {
  setState(state => {
    delete state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`][state.selectedTimeSlot];
    return state;
  })
}

export { generateDaySchedule, generateHourColumn, fetchDayTasksForDriver, generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, createNewTask, wipeSelectedFields, fetchSelectedTask, deleteTask }