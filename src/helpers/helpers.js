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
  if (time === 12) return '12pm';
  if (time === 0 || time % 12 === 0) return '12am';
  return time > 12 ? `${time % 12}pm` : `${time}am`;
}

const generateCompatibleEndTimeOptions= (state) => {
  const todayTasks = fetchDayTasksForDriver(state.schedule, state.week, state.day, state.driver);
  const options = [];
  let possibleEndTime = state.selectedTask ? parseInt(state.selectedTask.end_time) : parseInt(state.selectedTimeSlot);

  while (possibleEndTime < 24 && !todayTasks[possibleEndTime]) {
    options.push(<option value={possibleEndTime + 1}>{parseTimeString(possibleEndTime + 1)}</option>);
    possibleEndTime++;
  }
  return options;
}

const generateCompatibleStartTimeOptions = (state) => {
  const options = [];
  const todayTasks = fetchDayTasksForDriver(state.schedule, state.week, state.day, state.driver);
  let earlierTask = 0;
  for (let i = state.selectedTimeSlot - 1; i >= 0; i--) {
    if (todayTasks[i]) {
      earlierTask = todayTasks[i].end_time;
      break;
    }
  }
  
  while (earlierTask <= state.selectedTimeSlot - 1) {
    options.push(<option value={earlierTask}>{parseTimeString(earlierTask)}</option>);
    earlierTask ++;
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
  const selectedTask = null;
  setState({...state, day, selectedTimeSlot, selectedTask});
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

const getCurrentWeek = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  return Math.ceil((((now - oneJan) / 86400000) + oneJan.getDay()+1)/7);
}

const generateWeekOptions = () => {
  let options = [];
  let i = getCurrentWeek();
  for (i; i <= 52; i++) {
  options.push(<option value={`Week${i}`}>{i}</option>)
  }
  return options;
}

const generateDayOptions = () => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => <option value={day}>{day}</option>)
}

const generateAllTimeOptions = () => {
  const options = [];
  for (let i = 0; i <= 24; i++) {
    options.push(<option value={i}>{parseTimeString(i)}</option>)
  }
  return options;
}

export { generateDaySchedule, generateHourColumn, fetchDayTasksForDriver, generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, createNewTask, wipeSelectedFields, fetchSelectedTask, deleteTask, getCurrentWeek, generateCompatibleStartTimeOptions, generateWeekOptions, generateDayOptions, generateAllTimeOptions }