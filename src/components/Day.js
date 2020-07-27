import React from 'react';
import { generateDaySchedule } from "../helpers/helpers"

export default function Day(props) {
  // const tasks = {
  //   "3": {
  //     start_time: 3,
  //     end_time: 5,
  //     task: 'Pickup'
  //   }
  // }
  let tasks;
  if (props.schedule[`Week${props.week}`]) {
    tasks = props.schedule[`Week${props.week}`][props.day] || {};
  } else {
    tasks = {};
  }
  // const tasks = props.schedule[`Week${props.week}`] && props.schedule[`Week${props.week}`][props.day] ? props.schedule[props.week][props.day] : {};
  const daySchedule = generateDaySchedule(tasks, props.setDay);
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