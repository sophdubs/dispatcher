import React from "react";

export default function Nav(props) {
  const incrementWeek = () => {
   props.setWeek(props.week === 52 ? 1 : props.week + 1);
  }

  const decrementWeek = () => {
    props.setWeek(props.week === 1 ? 52 : props.week - 1);
   }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Driver {props.driver}
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={()=>props.setDriver(1)}>Driver 1</li>
              <li className="dropdown-item" onClick={()=>props.setDriver(2)}>Driver 2</li>
              <li className="dropdown-item" onClick={()=>props.setDriver(3) }>Driver 3</li>
            </ul>
          </li>
          <li>
            <button onClick={decrementWeek}>{'<'}</button>
            <span>Week {props.week}</span>
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