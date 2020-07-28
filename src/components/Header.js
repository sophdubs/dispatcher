import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { getCurrentWeek } from "../helpers/helpers";

export default function Header() {
  const { state, setState } = useContext(GlobalContext); 
  
  const onClickSkip = (e) => {
    const week = parseInt(document.querySelector('.skip-input').value);
    if (week && week >= 1 && week <= 52) {
      setState({...state, week});
    }
    document.querySelector('.skip-input').value="";
  }

  const onClickCurrent = (e) => {
    const week = getCurrentWeek();
    setState({...state, week});
  }
  
  return (
    <header>
      <ul class="header">
        <li onClick={onClickCurrent}><span>{`<< `}</span>{`Current week`}</li>
        <li onClick={onClickSkip}>{`Skip to week `}<input class="skip-input" type="text"></input>{`>>`}</li>
      </ul>
    </header>
  );
}