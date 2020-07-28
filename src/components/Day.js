import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalContext";
import { generateDaySchedule, fetchDayTasksForDriver, generateCompatibleEndTimes, showNewTaskForm } from "../helpers/helpers"


export default function Day(props) {
  const { state, setState } = useContext(GlobalContext);

  const onClickTimeSlot = (e) => {
    // Grab selected time slot
    const selectedTimeSlot = parseInt(e.target.dataset.time);
    // Set day && Set selected timeslot 
    setState({...state, day: props.day, selectedTimeSlot});
  }
  
  const tasks = fetchDayTasksForDriver(state.schedule, state.week, props.day, state.driver);
  const daySchedule = generateDaySchedule(tasks, onClickTimeSlot);
  
  return (
    <>
    <li class="list-inline-item">
      <ul class="week-table">
        <li class="day-name">{props.day}</li>
        { daySchedule }
      </ul>
    </li>
    </>
  )
}