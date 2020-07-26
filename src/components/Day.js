import React from 'react';
import { generateDaySchedule } from "../helpers/helpers"

export default function Day(props) {
  const tasks = {
    "3": {
      start_time: 3,
      end_time: 5,
      task: 'pickup'
    }
  }
  const daySchedule = generateDaySchedule(tasks);
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