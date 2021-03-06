import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { addTaskToSchedule, wipeSelectedFields, deleteTask, validateForm, generateAvailableTimeOptions } from "../helpers/helpers";
import $ from 'jquery';

export default function Edit() {
  const { state, setState } = useContext(GlobalContext); 

  const onFormSubmit = (e) => {
    // prevent default form submission
    e.preventDefault();
    // grab values from form
    const endTime = e.target['end-time'].value;
    const startTime = e.target['start-time'].value;
    const task = e.target.task.value;
    // Returns a string with an error if start time < end time or if fields are missing from the form
    const error = validateForm(startTime, endTime, state.selectedTask.location);
    if (error) {
      alert(error);
      return;
    }
    // Deletes task from state.schedule
    deleteTask(state, setState);
    // Create new task
    const newTask = {
      ...state.selectedTask, 
      end_time: endTime,
      start_time: startTime,
      task
    }
    // Select current time slot
    setState({...state, time: startTime});
    // Add new task
    addTaskToSchedule(newTask, state, setState);
    // Clears selected task, date, and time slot
    wipeSelectedFields(state, setState);
    // Toggle form close
    $('#editTaskForm').modal('hide');
  }

  const onDelete = (e) => {
    // Deletes task from state.schedule
    deleteTask(state, setState);
    // Update state 
    const day = null;
    const selectedTimeSlot = null;
    const selectedTask = null;
    setState({...state, day, selectedTimeSlot, selectedTask});
    // Toggle form close
    $('#editTaskForm').modal('hide');
  }

  const onLocationChange = (e) => {
    // controlled form input updates state onChange
    const selectedTask = {
      ...state.selectedTask, 
      location: e.target.value
    };
    setState({...state, selectedTask});
  }

  // Generates a list of earlier and later times from current start time that do not conlfict with any other existing tasks
  const availableTimeOptions = generateAvailableTimeOptions(state);

  return (
    <div className="modal fade" id="editTaskForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form edit-form" onSubmit={onFormSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="driver">Driver</span>
                  </div>
                  <input type="text" className="form-control"  value={state.driver}></input>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="week">Week</span>
                  </div>
                  <input type="text" className="form-control" value={state.week}></input>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="day">Day</span>
                  </div>
                  <input type="text" className="form-control" value={state.day}></input>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="start-time">Start Time</label>
                  </div>
                  <select className="custom-select form-control" id="start-time">
                    {availableTimeOptions}
                  </select>
                </div>
              
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select className="custom-select form-control" id="end-time">
                    {availableTimeOptions}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="task">Task</label>
                  </div>
                  <select className="custom-select form-control" id="task">
                    <option selected>Pickup Goods</option>
                    <option>Deliver Goods</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="location">Location</span>
                  </div>
                  <input type="text" className="form-control location-input" placeholder="enter city" name="location" onChange={onLocationChange} value={state.selectedTask ? state.selectedTask.location : ""}></input>
                </div>
                <div className="edit-buttons">
                  <button type="button" className="btn btn-danger" onClick={onDelete}>Delete Task</button>
                  <button type="submit" className="btn btn-secondary">Save Changes</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}