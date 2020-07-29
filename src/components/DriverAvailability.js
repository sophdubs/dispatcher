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
      <h1>{`Driver${props.driver}`}</h1>
   
      {/* Case: Driver has no tasks that day */}
      { conflictingTasks.length === 0 &&
        <div className="driver-details-body">
          <h2 className="no-conflict-header">No Conflicts</h2>
          <h3>{`${Object.keys(props.tasks).length} tasks scheduled`}</h3>
          <ul>
            {taskListItems}
          </ul>
        </div>
      }

      { conflictingTasks.length !== 0 && 
        <div className="driver-details-body">
          <h2 className="conflict-header">{conflictingTasks.length} Conflict(s)</h2>
          <h3>{`${Object.keys(props.tasks).length} tasks scheduled`}</h3>
          <ul>
            {taskListItems}
          </ul>
      </div>
      }

      <button>{`Book With Driver${props.driver}`}</button>
      { conflictingTasks.length > 0 &&
        <p className="warning">{`Warning! Booking with this driver will result in cancelling all conflicting tasks`}</p>
      }
    </li>
  
  )
}