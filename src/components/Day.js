import React from 'react';
import { generateDaySchedule } from "../helpers/helpers"

export default function Day(props) {
  const daySchedule = generateDaySchedule();
  return (
    <>
    <li class="list-inline-item">
      <ul>
        {props.day}
        { daySchedule }
      </ul>
    </li>
    </>
  )
}