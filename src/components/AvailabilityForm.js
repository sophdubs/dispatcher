import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateWeekOptions, generateDayOptions, generateAllTimeOptions, validateForm } from "../helpers/helpers";
import $ from 'jquery';

export default function AvailabilityForm() {
  const { state, setState } = useContext(GlobalContext); 

  // Generate dowpdown options for form
  const weekOptions = generateWeekOptions();
  const dayOptions = generateDayOptions();
  const allTimeOptions = generateAllTimeOptions();

  const onCheckAvailability = (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Extract values from form
    const week = e.target['week'].value;
    const day = e.target['day'].value;
    const startTime = e.target['start-time'].value;
    const endTime = e.target['end-time'].value;
    const task = e.target['task'].value;
    const location = e.target['location'].value;

    // Validate form. If missing fields or startTime >= endTime, validateForm returns an error string
    const error = validateForm(startTime, endTime, location);
    if (error) {
      alert(error);
      return;
    }

    // Store tentative task details in state
    const checkAvailabilityTask = {
      week,
      day,
      start_time: startTime,
      end_time: endTime,
      task,
      location
    };
    setState({...state, checkAvailabilityTask});

    // Toggle this form close
    $('#availabilityForm').modal('hide');
    // Toggle availabilityDetails open
    $('#availabilityDetails').modal('show');
  }

  return (
    <div className="modal fade" id="availabilityForm" tabindex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Check Availability</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form availability-form" onSubmit={onCheckAvailability}>
                
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="week">Week</span>
                  </div>
                  <select className="custom-select form-control" id="week">
                    {weekOptions}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="day">Day</span>
                  </div>
                  <select className="custom-select form-control" id="day">
                    {dayOptions}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="start-time">Start Time</label>
                  </div>
                  <select className="custom-select form-control" id="start-time">
                    {allTimeOptions}
                  </select>
                </div>
              
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="end-time">End Time</label>
                  </div>
                  <select className="custom-select form-control" id="end-time">
                    {allTimeOptions.slice(1)}
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
                  <input type="text" className="form-control location-input" placeholder="enter city" name="location"/>
                </div>

                <div className="availability-buttons">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-secondary">Check Availability</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}