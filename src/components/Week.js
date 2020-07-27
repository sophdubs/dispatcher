import React from "react"
import Day from "./Day";
import { generateHourColumn } from "../helpers/helpers";

export default function Week(props) {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(weekday => <Day day={weekday} schedule={props.schedule} week={props.week} driver={props.driver} setDay={()=> props.setDay(weekday)} setSelectedTimeSlot={props.setSelectedTimeSlot}/>)
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