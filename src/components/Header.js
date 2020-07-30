import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { getCurrentWeek } from "../helpers/helpers";
import $ from 'jquery';

export default function Header() {
  const { state, setState } = useContext(GlobalContext); 
  
  // Skips to a given week
  const onClickSkip = (e) => {
    const week = parseInt(document.querySelector('.skip-input').value);
    if (week && week >= 1 && week <= 52) {
      setState({...state, week});
    }
    document.querySelector('.skip-input').value="";
  }

  // Returns to current week
  const onClickCurrent = (e) => {
    const week = getCurrentWeek();
    setState({...state, week});
  }

  // Toggles availability form open
  const onClickAvailability = (e) => {
    $('#availabilityForm').modal('show');
  }
  
  return (
    <header>
      <ul class="header">
        <li onClick={onClickCurrent}><span>{`<< `}</span>{`Current week`}</li>
        <li onClick={onClickAvailability}>Check Availability</li>
        <li onClick={onClickSkip}>{`Skip to week `}<input class="skip-input" type="text"></input>{`>>`}</li>
      </ul>
    </header>
  );
}