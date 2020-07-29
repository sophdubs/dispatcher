import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateWeekOptions, generateDayOptions, generateAllTimeOptions } from "../helpers/helpers";
import $ from 'jquery';

export default function AvailabilityForm() {
  const { state, setState } = useContext(GlobalContext); 

  const weekOptions = generateWeekOptions();
  const dayOptions = generateDayOptions();
  const allTimeOptions = generateAllTimeOptions();

  const onCheckAvailability = (e) => {
    e.preventDefault();
    const week = e.target['week'].value;
    const day = e.target['day'].value;
    const startTime = e.target['start-time'].value;
    const endTime = e.target['end-time'].value;
    const task = e.target['task'].value;
    const location = e.target['location'].value

    const checkAvailabilityTask = {
      week,
      day,
      start_time: startTime,
      end_time: endTime,
      task,
      location
    };

    setState({...state, checkAvailabilityTask});
    $('#availabilityForm').modal('hide');
    $('#availabilityDetails').modal('show');
  }


 
  return (
    <div class="modal fade" id="availabilityForm" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Check Availability</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form className="form" onSubmit={onCheckAvailability}>
                
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="week">Week</span>
                  </div>
                  <select class="custom-select form-control" id="week">
                    {weekOptions}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="day">Day</span>
                  </div>
                  <select class="custom-select form-control" id="day">
                    {dayOptions}
                  </select>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="start-time">Start Time</label>
                  </div>
                  <select class="custom-select form-control" id="start-time">
                    {allTimeOptions}
                  </select>
                </div>
              
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select class="custom-select form-control" id="end-time">
                    {allTimeOptions.slice(1)}
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
                  <input type="text" class="form-control location-input" placeholder="enter city" name="location"/>
                </div>

                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-secondary">Check Availability</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}