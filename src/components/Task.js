import React from 'react';
import { parseTimeString } from "../helpers/helpers";

export default function Task(props) {
  const duration = props.end_time - props.start_time;
  return (
    <li className={`task ${props.task[0]}task`} data-start={props.start_time} data-end={props.end_time} data-task={props.task} data-toggle="modal" data-target="#editTaskForm" style={{height: `${duration * 8}vh`}} onClickCapture={(e) => props.onClickTask(e)}>
      <div>
        <h4>{props.task}</h4>
        <p>{props.location}</p>
        <p>{`${parseTimeString(props.start_time)}-${parseTimeString(props.end_time)}`}</p>
      </div>
    </li>
  );
}