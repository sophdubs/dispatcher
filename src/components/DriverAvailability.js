import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { findConflictingTasks, generateTaskListItems, deleteConflictingTasks, addTaskToSchedule, wipeSelectedFields } from "../helpers/helpers";
import $ from 'jquery';

export default function DriverAvailability(props) {
  const { state, setState } = useContext(GlobalContext); 

  // Generates array of conflicting tasks
  const conflictingTasks = findConflictingTasks(state, props.tasks);
  // Generates the listItems for each of the scheduled tasks for that day
  const taskListItems = generateTaskListItems(props.tasks, conflictingTasks);
  
  const onBookDriver  = (e) => {
    // Delete conflicting tasks if there are any
    if (conflictingTasks.length !== 0) {
      deleteConflictingTasks(setState, props.driver, state.checkAvailabilityTask.week, state.checkAvailabilityTask.day, conflictingTasks);
    }
    // Create new task
    const newTask = {
      start_time: state.checkAvailabilityTask.start_time,
      end_time: state.checkAvailabilityTask.end_time,
      task: state.checkAvailabilityTask.task,
      location: state.checkAvailabilityTask.location
    }
    // Update state
    const driver = props.driver;
    const week = state.checkAvailabilityTask.week;
    const day = state.checkAvailabilityTask.day;
    const selectedTimeSlot = state.checkAvailabilityTask.start_time;
    setState({...state, driver, week, day, selectedTimeSlot});
    // add new task to state.schedule 
    addTaskToSchedule(newTask, state, setState);
    wipeSelectedFields(state, setState);
    // Update state
    setState({...state, driver: props.driver, checkAvailabilityTask: null, week});
    //  Toggle form close
    $('#availabilityDetails').modal('hide');
  }

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
        <button type="button" onClick={onBookDriver} className="btn btn-secondary book-driver">{`Book With Driver${props.driver}`}</button>
      </div>
    </li>
  
  )
}