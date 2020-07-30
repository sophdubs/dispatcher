import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalContext";
import { generateDaySchedule, fetchDayTasksForDriver, fetchSelectedTask } from "../helpers/helpers"
import $ from 'jquery';


export default function Day(props) {
  const { state, setState } = useContext(GlobalContext);

  const onClickTimeSlot = (e) => {
    // Grab selected time slot
    const selectedTimeSlot = parseInt(e.target.dataset.time);
    // Set day && Set selected timeslot 
    setState({...state, day: props.day, selectedTimeSlot});
  }

  const onClickTask = (e) => {
    let taskElem = e.target;
    // catch event on LI
    while(taskElem.nodeName !== 'LI') {
      taskElem = $(taskElem).parent()[0];
    }
    // Grab data fields needed from clicked task
    const selectedTimeSlot = taskElem.dataset.start;
    const day = props.day;
    // Update state with selected task details
    const selectedTask = fetchSelectedTask(day, state.week, state.driver, selectedTimeSlot, state);
    setState({...state, selectedTimeSlot, day, selectedTask});
  }

  // Fetches all the task for a specified driver on a specified week and day
  const tasks = fetchDayTasksForDriver(state.schedule, state.week, props.day, state.driver);
  // Generates the column for each day of the week
  const daySchedule = generateDaySchedule(tasks, onClickTimeSlot, onClickTask);
  
  return (
    <>
    <li className="list-inline-item">
      <ul className="week-table">
        <li className="day-name">{props.day}</li>
        { daySchedule }
      </ul>
    </li>
    </>
  )
}