import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateDriverDetails } from "../helpers/helpers";

export default function AvailabilityDetails() {
  const { state } = useContext(GlobalContext); 

  const driverDetails = [1, 2, 3].map(driver => generateDriverDetails(state, driver));
  
  return (
    <div className="modal fade" id="availabilityDetails" tabindex="-1">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content availability-modal">
          <div className="modal-header">
            <h5 className="modal-title">Availability Details</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className="driver-details-ul">
              {driverDetails}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}