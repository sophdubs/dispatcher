import React from 'react';

export default function Task(props) {
  const duration = props.end_time - props.start_time;
  return (
    <li className="task" style={{height: `${duration * 6}vh`}}>
      <div>
        <h4>{props.task}</h4>
        <p>{props.start_time > 12 ? `${props.start_time % 12}pm` :`${props.start_time}am`} - {props.end_time > 12 ? `${props.end_time % 12}pm` : `${props.end_time}am`}</p>
      </div>
    </li>
  );
}