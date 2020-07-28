import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateCompatibleEndTimeOptions, parseTimeString, addTaskToSchedule, wipeSelectedFields, createNewTask, fetchSelectedTask, deleteTask } from "../helpers/helpers";
import $ from 'jquery';

export default function Edit() {
  const { state, setState } = useContext(GlobalContext); 

  const onFormSubmit = (e) => {
    // e.preventDefault();
    
    // const endTime = e.target['end-time'].value;
    // const task = e.target.task.value;
    // const newTask = createNewTask(endTime, task, state);
    
    // addTaskToSchedule(newTask, state, setState);

    // wipeSelectedFields(state, setState);

    // const day = null;
    // const selectedTimeSlot = null;
    // setState({...state, day, selectedTimeSlot});
    // $('#newTaskForm').modal('hide');
    // // Toggle form close
  }

  const onDelete = (e) => {
    console.log(e);
    console.log(state);
    deleteTask(state, setState);
    const day = null;
    const selectedTimeSlot = null;
    const selectedTask = null;
    setState({...state, day, selectedTimeSlot, selectedTask});
    $('#editTaskForm').modal('hide');
  }

  const endOptions = generateCompatibleEndTimeOptions(state);
 
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
          <p>{JSON.stringify(state)}</p>
          <div class="modal-body">
            <form className="form" onSubmit={onFormSubmit}>
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
                    <span class="input-group-text" id="start-time">Start Time</span>
                  </div>
                  <input type="text" class="form-control" value={parseTimeString(state.selectedTimeSlot)}></input>
                </div>
              
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select class="custom-select form-control" id="end-time">
                    {endOptions}
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
                <button type="button" class="btn btn-danger" onClick={onDelete}>Delete</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-secondary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}