import React from "react";
import Task from "../components/Task";
import DriverAvailability from "../components/DriverAvailability";

const generateHourColumn = () => {
  const column = [];
  for (let i = 0; i <= 24; i++) {
  column.push(<li key={i} className="hour-label"><p>{parseTimeString(i)}</p></li>);
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
      schedule.push(<li key={i} className="time-slot" data-time={i} data-toggle="modal" data-target="#newTaskForm" onClick={onClickTimeSlot}>+</li>);
    }
  }
  schedule.push(<li key={25} className="time-slot buffer" data-time={25}>+</li>)
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

const generateAvailableTimeOptions = (state) => {
  const options = [];
  const todayTasks = fetchDayTasksForDriver(state.schedule, state.week, state.day, state.driver);

  let earlierTask = 0;
  for (let i = state.selectedTimeSlot - 1; i >= 0; i--) {
    if (todayTasks[i]) {
      earlierTask = todayTasks[i].end_time;
      break;
    }
  }

  let laterTask = 24
  for (let i = parseInt(state.selectedTimeSlot) + 1; i < 24; i++) {
    if (todayTasks[i]) {
      laterTask = i;
      break
    }
  }

  while (earlierTask <= laterTask) {
    options.push(<option value={earlierTask}>{parseTimeString(earlierTask)}</option>);
    earlierTask ++;
  }
  return options;
}

const addTaskToSchedule = (newTask, state, setState) => {
  setState(state => {
    if (state.schedule[`driver${state.driver}`][`Week${state.week}`]) {
      if(state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`]) {
        state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`][`${newTask.start_time}`] = newTask;
      } else {
        state.schedule[`driver${state.driver}`][`Week${state.week}`][`${state.day}`] = {
          [`${newTask.start_time}`]: newTask
        }
      }
    } else {
      state.schedule[`driver${state.driver}`][`Week${state.week}`] = {
        [`${state.day}`]: {
          [`${newTask.start_time}`]: newTask
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
  options.push(<option value={i}>{i}</option>)
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

const generateDriverDetails = (state, driver) => {
  let tasks = {};
  if (state.checkAvailabilityTask) {
    tasks = fetchDayTasksForDriver(state.schedule, state.checkAvailabilityTask.week, state.checkAvailabilityTask.day, driver);
  }
  return <DriverAvailability driver={driver} tasks={tasks} />
}

const findConflictingTasks = (state, tasks) => {
  const conflicts = [];
  if(state.checkAvailabilityTask) {
    const startTime = parseInt(state.checkAvailabilityTask.start_time);
    const endTime = parseInt(state.checkAvailabilityTask.end_time);
    for (const [time, task] of Object.entries(tasks)) {
      if ((startTime === task.start_time) || (startTime < task.start_time && endTime > task.start_time) || (startTime > task.start_time && startTime < task.end_time)){
        conflicts.push(time);
      }
    }
  }
  return conflicts;
};

const generateTaskListItems = (tasks, conflictingTasks) => {
  const listItems = [];
  for (const task of Object.values(tasks)) {
    listItems.push(<li className={conflictingTasks.includes(`${task.start_time}`) ? "details-task conflict" : "details-task"}>
      <h1>{task.task}</h1>
      <p>{task.location}</p>
      <p>{`${parseTimeString(task.start_time)}-${parseTimeString(task.end_time)}`}</p>
    </li>)
  }
  return listItems;
}

const deleteConflictingTasks = (setState, driver, week, day, conflictingTasks) => {
  setState(state => {
    for (const taskTime of conflictingTasks) {
      delete state.schedule[`driver${driver}`][`Week${week}`][`${day}`][taskTime];
    }
    return state;
  })
}

const validateForm = (startTime, endTime, location) => {
  console.log({startTime, endTime, location})
  if (!(startTime.toString)|| !(endTime.toString) || !location) {
    return "Please fill in all form fields";
  }
  if (parseInt(endTime) <= parseInt(startTime)) {
    return "End time must be after start time";
  }
}


export { generateDaySchedule, generateHourColumn, fetchDayTasksForDriver, generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, createNewTask, wipeSelectedFields, fetchSelectedTask, deleteTask, getCurrentWeek, generateCompatibleStartTimeOptions, generateWeekOptions, generateDayOptions, generateAllTimeOptions, generateDriverDetails, findConflictingTasks, generateTaskListItems, deleteConflictingTasks, validateForm, generateAvailableTimeOptions }