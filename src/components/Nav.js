import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Nav() {
  const { state, setState } = useContext(GlobalContext);

  const incrementWeek = () => {
    const week = state.week === 52 ? 1 : state.week + 1;
    setState({...state, week})
  }

  const decrementWeek = () => {
    const week = state.week === 1 ? 52 : state.week - 1;
    setState({...state, week});
  }

  const setDriver = (driver) => {
    setState({...state, driver});
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Driver {state.driver}
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={()=>setDriver(1)}>Driver 1</li>
              <li className="dropdown-item" onClick={()=>setDriver(2)}>Driver 2</li>
              <li className="dropdown-item" onClick={()=>setDriver(3)}>Driver 3</li>
            </ul>
          </li>
          <li>
            <button onClick={decrementWeek}>{'<'}</button>
            <span>Week {state.week}</span>
            <button onClick={incrementWeek}>{'>'}</button>
          </li>
        </ul>
        <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Download Schedule
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">2 days</li>
              <li className="dropdown-item">4 days</li>
              <li className="dropdown-item">7 days</li>
            </ul>
        </div>
        
      </div>
    </nav>
  )
}