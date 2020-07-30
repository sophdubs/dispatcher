import React from "react";
import Day from "./Day";
import { generateHourColumn } from "../helpers/helpers";

export default function Week(props) {

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(weekday => <Day day={weekday}/>)
  const hourColumn = generateHourColumn();
  return (
    <div className="week">
      <ul className="list-inline">
        <li className="list-inline-item">
          <ul className="hour-column">
            {hourColumn}
          </ul>
        </li>
        {weekDays}
      </ul>
    </div>
  )
}