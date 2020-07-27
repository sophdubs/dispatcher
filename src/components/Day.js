import React from 'react';
import { generateDaySchedule, fetchDayTasksForDriver } from "../helpers/helpers"

export default function Day(props) {
  const onClickTimeSlot = (e) => {
    console.log(e.target);
    console.log('-----props -----');
    console.log(props);
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