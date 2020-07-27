import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Week from "./components/Week";
function App() {
  const [state, setState] = useState({
    day: null,
    driver: 1,
    week: 1,
    schedule: {
      driver1: {
        Week1: {
          Monday: {
            1: {
              start_time: 1,
              end_time: 3,
              task: "Pickup"
            }
          },
          Tuesday: {
            9: {
              start_time: 9,
              end_time: 11,
              task: "Delivery"
            }
          }
        }
      },
      driver2: {},
      driver3: {}
    }
  });

  const setWeek = week => {
    setState({...state, week});
  }

  const setDay = day => {
    setState({...state, day});
  }

  const setDriver = driver => {
    setState({...state, driver});
  }

  return (
    <div className="App">
      <Nav 
        setDriver={setDriver}
        setWeek={setWeek}
        week= {state.week}
        driver= {state.driver}
      />
      <Week 
        setDay={setDay}
        week={state.week}
        driver={state.driver}
        schedule={state.schedule}
      />
    </div>
  );
}

export default App;
