import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Week from './components/Week';
import New from './components/New';
import Edit from './components/Edit';
import Header from './components/Header';
import { GlobalContext } from "../src/GlobalContext";
import { getCurrentWeek } from "./helpers/helpers";

function App() {
  const week = getCurrentWeek();
  const [state, setState] = useState({
    day: null,
    driver: 1,
    selectedTimeSlot: null,
    selectedTask: null,
    week: week,
    schedule: {
      driver1: {
        [`Week${week}`]: {
          Monday: {
            1: {
              start_time: 1,
              end_time: 3,
              task: "Pickup Goods",
              location: "Toronto"
            }
          },
          Tuesday: {
            9: {
              start_time: 9,
              end_time: 11,
              task: "Deliver Goods",
              location: "Ottawa"
            }
          },
          Wednesday: {
            18: {
              start_time: 18,
              end_time: 20,
              task: "Other",
              location: "Montreal"
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
        <Header/>
        <Week/>
        <New/>
        <Edit/>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
