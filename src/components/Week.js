import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import Day from "./Day";
import { generateHourColumn } from "../helpers/helpers";

export default function Week(props) {
  const { state, setState } = useContext(GlobalContext);

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(weekday => <Day day={weekday}/>)
  const hourColumn = generateHourColumn();
  return (
    <div className="week">
      <ul class="list-inline">
        <li class="list-inline-item">
          <ul class="hour-column">
            {hourColumn}
          </ul>
        </li>
        {weekDays}
      </ul>
    </div>
  )
}