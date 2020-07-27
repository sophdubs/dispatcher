import React from 'react';
import { generateDaySchedule, fetchDayTasksForDriver, generateCompatibleEndTimes, showNewTaskForm } from "../helpers/helpers"

export default function Day(props) {
  const onClickTimeSlot = (e) => {
    props.setDay();
    const startTime = parseInt(e.target.dataset.time);
    // props.setSelectedTimeSlot(startTime);
    const endTimes = generateCompatibleEndTimes(startTime, props);
    // props.setState({selectedTimeSlot: startTime, day: props.day})
    showNewTaskForm(startTime, endTimes);
  }

  const tasks = fetchDayTasksForDriver(props.schedule, props.week, props.day, props.driver)
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