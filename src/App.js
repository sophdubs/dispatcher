import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Week from "./components/Week";
function App() {
  const [state, setState] = useState({
    day: null,
    driver: 1,
    week: 1
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
        week = {state.week}
      />
      <Week />
    </div>
  );
}

export default App;
