import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Week from './components/Week';
import New from './components/New';
import { GlobalContext } from "../src/GlobalContext";

function App() {
  const [state, setState] = useState({
    day: null,
    driver: 1,
    selectedTimeSlot: null,
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
          },
          Wednesday: {
            18: {
              start_time: 18,
              end_time: 20,
              task: "Other"
            }
          }
        }
      },
      driver2: {},
      driver3: {}
    }
  });

  return (
    <div className="App">
      <GlobalContext.Provider value={{state, setState}}>
        <Nav/>
        <Week/>
        <New/>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
