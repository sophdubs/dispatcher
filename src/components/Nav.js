import React, { useContext } from "react";
import { CSVLink } from "react-csv";
import { GlobalContext } from "../GlobalContext";
import { fetchData, headers } from "../helpers/downloadCSV";

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

  // const onClickDownload = (numDays) => {
  //   downloadCSV(numDays, state.schedule[`driver${state.driver}`]);
  // }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse d-flex justify-content-between">
        <div className="nav-item one-third">
          <img src="https://www.roserocket.com/static/media/logo-white.1576a2ec.svg" className="navbar-brand logo" alt="rose-rocket"/>
        </div>
        <div className="nav-item week-select one-third">
          <button onClick={decrementWeek}>&#x25C0;</button>
          <span>Week {state.week}</span>
          <button onClick={incrementWeek}>&#x25B6;</button>
        </div>
        <div className="nav-item d-flex flex-row one-third dropdowns">
          <div className="dropdown driver-dd">
            <a href="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
              Driver {state.driver}
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={()=>setDriver(1)}>Driver 1</li>
              <li className="dropdown-item" onClick={()=>setDriver(2)}>Driver 2</li>
              <li className="dropdown-item" onClick={()=>setDriver(3)}>Driver 3</li>
            </ul>
          </div>
          <div className="dropdown download-dd">
              <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Download
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><CSVLink headers={headers} data={fetchData(2, state.schedule[`driver${state.driver}`])}>2 days</CSVLink></li>
                <li className="dropdown-item"><CSVLink headers={headers} data={fetchData(4, state.schedule[`driver${state.driver}`])}>4 days</CSVLink></li>
                <li className="dropdown-item"><CSVLink headers={headers} data={fetchData(7, state.schedule[`driver${state.driver}`])}>7 days</CSVLink></li>
                <li className="dropdown-item"><CSVLink headers={headers} data={fetchData(14, state.schedule[`driver${state.driver}`])}>14 days</CSVLink></li>
                <li className="dropdown-item"><CSVLink headers={headers} data={fetchData(28, state.schedule[`driver${state.driver}`])}>28 days</CSVLink></li>           
              </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}