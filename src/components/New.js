import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, wipeSelectedFields, createNewTask, validateForm } from "../helpers/helpers";
import $ from 'jquery';

export default function New() {
  const { state, setState } = useContext(GlobalContext); 
  
  const onFormSubmit = (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Extract values from form
    const endTime = e.target['end-time'].value;
    const task = e.target.task.value;
    const location = e.target.location.value;
    // Validate form inputs
    const error = validateForm(state.selectedTimeSlot, endTime, location);
    if (error) {
      alert(error);
      return;
    }
    // Create new task
    const newTask = createNewTask(endTime, task, state, location);
    // Add task to state.schedule
    addTaskToSchedule(newTask, state, setState);
    wipeSelectedFields(state, setState);
    // Toggle form close
    $('#newTaskForm').modal('hide');
  }

  // Generates array of options for non-conflicting end times 
  const options = generateCompatibleEndTimeOptions(state);

  return (
    <div className="modal fade" id="newTaskForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Task</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form new-form" onSubmit={onFormSubmit}>
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
                    <span className="input-group-text" id="start-time">Start Time</span>
                  </div>
                  <input type="text" className="form-control" value={parseTimeString(state.selectedTimeSlot)}></input>
                </div>
              
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select className="custom-select form-control" id="end-time">
                    {options}
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
                  <input type="text" className="form-control" placeholder="enter city" name="location"></input>
                </div>
                <div className="new-buttons">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-secondary">Save</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}