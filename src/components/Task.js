import React from 'react';

export default function Task(props) {
  const duration = props.end_time - props.start_time;
  return (
    <li className="task" style={{height: `${duration * 6}vh`}}>
      <div>
        <h4>{props.task}</h4>
        <p>{props.start_time} - {props.end_time}</p>
      </div>
    </li>
  );
}