import React from "react";

export default function Nav(props) {
  console.log('-----my props: ------');
  console.log(props);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Drivers
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">Driver1</li>
              <li className="dropdown-item">Driver2</li>
              <li className="dropdown-item">Driver3</li>
            </ul>
          </li>
          <li>
            <button onClick={()=>props.setWeek(props.week - 1)}>{'<'}</button>
            <span>Week {props.week}</span>
            <button onClick={()=>props.setWeek(props.week + 1)}>{'>'}</button>
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