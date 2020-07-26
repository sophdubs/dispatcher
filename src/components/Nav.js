import React from "react";

export default function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <a className="navbar-brand" href="#">Dispatcher</a>
     

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
            <button>{'<'}</button>
            <span>Week 1</span>
            <button>{'>'}</button>
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