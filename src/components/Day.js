import React from 'react';
import { generateDaySchedule } from "../helpers/helpers"

export default function Day(props) {
  const daySchedule = generateDaySchedule();
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