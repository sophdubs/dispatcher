import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateDriverDetails } from "../helpers/helpers";
import $ from 'jquery';

export default function AvailabilityDetails() {
  const { state, setState } = useContext(GlobalContext); 

  const driverDetails = [1, 2, 3].map(driver => generateDriverDetails(state, driver));
  
  return (
    <div class="modal fade" id="availabilityDetails" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Availability Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              {driverDetails}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}