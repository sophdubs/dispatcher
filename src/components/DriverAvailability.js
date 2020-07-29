import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { findConflictingTasks, generateTaskListItems } from "../helpers/helpers";
import $ from 'jquery';

export default function DriverAvailability(props) {
  const { state, setState } = useContext(GlobalContext); 

  const conflictingTasks = findConflictingTasks(state, props.tasks);
  const taskListItems = generateTaskListItems(props.tasks, conflictingTasks);
  console.log(conflictingTasks);

  return (
    <li class="driver-details">
      <div>
        <h1>{`Driver${props.driver}`}</h1>
        { conflictingTasks.length === 0 ?
          <h2 className="no-conflict-header">No Conflicts</h2>
          :
          <h2 className="conflict-header">{conflictingTasks.length} Conflict(s)</h2>
        }
        <h3>{`${Object.keys(props.tasks).length} tasks scheduled`}</h3>
      </div>
   
      <ul class="driver-task-list">
        {taskListItems}
      </ul>
 
      <div>
        { conflictingTasks.length > 0 &&
          <p className="warning">{`Warning! This action will cancel all conflicting tasks`}</p>
        }
        <button type="button" className="btn btn-secondary book-driver">{`Book With Driver${props.driver}`}</button>
      </div>
    </li>
  
  )
}