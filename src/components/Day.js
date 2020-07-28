import React, { useContext } from 'react';
import { GlobalContext } from "../GlobalContext";
import { generateDaySchedule, fetchDayTasksForDriver, generateCompatibleEndTimes, showNewTaskForm, fetchSelectedTask } from "../helpers/helpers"
import $ from 'jquery';


export default function Day(props) {
  const { state, setState } = useContext(GlobalContext);

  const onClickTimeSlot = (e) => {
    console.log(e.target);
    // Grab selected time slot
    const selectedTimeSlot = parseInt(e.target.dataset.time);
    // Set day && Set selected timeslot 
    setState({...state, day: props.day, selectedTimeSlot});
  }

  const onClickTask = (e) => {
    let taskElem = e.target;
    while(taskElem.nodeName !== 'LI') {
      taskElem = $(taskElem).parent()[0];
    }
    const selectedTimeSlot = taskElem.dataset.start;
    const day = props.day;
    const selectedTask = fetchSelectedTask(day, state.week, state.driver, selectedTimeSlot, state);
    setState({...state, selectedTimeSlot, day, selectedTask});
  }

  const tasks = fetchDayTasksForDriver(state.schedule, state.week, props.day, state.driver);
  const daySchedule = generateDaySchedule(tasks, onClickTimeSlot, onClickTask);
  
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