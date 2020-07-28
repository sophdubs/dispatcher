import React from 'react';

export default function Task(props) {
  const duration = props.end_time - props.start_time;
  return (
    <li className="task" data-start={props.start_time} data-end={props.end_time} data-task={props.task} data-toggle="modal" data-target="#editTaskForm" style={{height: `${duration * 6}vh`}} onClickCapture={(e) => props.onClickTask(e)}>
      <div>
        <h4>{props.task}</h4>
        <p>{props.start_time > 12 ? `${props.start_time % 12}pm` :`${props.start_time}am`} - {props.end_time > 12 ? `${props.end_time % 12}pm` : `${props.end_time}am`}</p>
      </div>
    </li>
  );
}