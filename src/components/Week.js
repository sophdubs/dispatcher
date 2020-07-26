import React from "react"
import Day from "./Day";
import { generateHourColumn } from "../helpers/helpers";

export default function Week(props) {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(weekday => <Day day={weekday} />)
  const hourColumn = generateHourColumn();
  return (
    <div className="week">
      <ul class="list-inline">
        <li class="list-inline-item">
          <ul>
            {hourColumn}
          </ul>
        </li>
        {weekDays}
      </ul>
      <ul>

      </ul>
    </div>
  )
}