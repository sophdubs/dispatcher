import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, wipeSelectedFields, deleteTask, generateCompatibleStartTimeOptions, validateForm, generateAvailableTimeOptions } from "../helpers/helpers";
import $ from 'jquery';

export default function Edit() {
  const { state, setState } = useContext(GlobalContext); 

  const onFormSubmit = (e) => {
    e.preventDefault();
    const endTime = e.target['end-time'].value;
    const startTime = e.target['start-time'].value;
    const task = e.target.task.value;
    
    const error = validateForm(startTime, endTime, state.selectedTask.location);
    if (error) {
      alert(error);
      return;
    }

    const newTask = {
      ...state.selectedTask, 
      end_time: endTime,
      start_time: startTime,
      task
    }


    // Delete old task
    deleteTask(state, setState);
    // Select current time slot
    setState({...state, time: newTask.start_time});
    // Add new task
    addTaskToSchedule(newTask, state, setState);
    // Clear selected task, dat, and time slot
    wipeSelectedFields(state, setState);
    // Toggle form close
    $('#editTaskForm').modal('hide');
  }

  const onDelete = (e) => {
    deleteTask(state, setState);
    const day = null;
    const selectedTimeSlot = null;
    const selectedTask = null;
    setState({...state, day, selectedTimeSlot, selectedTask});
    $('#editTaskForm').modal('hide');
  }

  const onLocationChange = (e) => {
    const selectedTask = {
      ...state.selectedTask, 
      location: e.target.value
    };
    setState({...state, selectedTask});
  }

  const endOptions = generateCompatibleEndTimeOptions(state);
  const startOptions = generateCompatibleStartTimeOptions(state);

  const availableTimeOptions = generateAvailableTimeOptions(state);


 
  return (
    <div class="modal fade" id="editTaskForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form className="form edit-form" onSubmit={onFormSubmit}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="driver">Driver</span>
                  </div>
                  <input type="text" class="form-control"  value={state.driver}></input>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="week">Week</span>
                  </div>
                  <input type="text" class="form-control" value={state.week}></input>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="day">Day</span>
                  </div>
                  <input type="text" class="form-control" value={state.day}></input>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="start-time">Start Time</label>
                  </div>
                  <select class="custom-select form-control" id="start-time">
                    {availableTimeOptions}
                  </select>
                </div>
              
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select class="custom-select form-control" id="end-time">
                    {availableTimeOptions}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="task">Task</label>
                  </div>
                  <select className="custom-select form-control" id="task">
                    <option selected>Pickup Goods</option>
                    <option>Deliver Goods</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="location">Location</span>
                  </div>
                  <input type="text" class="form-control location-input" placeholder="enter city" name="location" onChange={onLocationChange} value={state.selectedTask ? state.selectedTask.location : ""}></input>
                </div>
                <div className="edit-buttons">
                  <button type="button" class="btn btn-danger" onClick={onDelete}>Delete Task</button>
                  <button type="submit" class="btn btn-secondary">Save Changes</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}