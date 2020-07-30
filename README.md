# Dispatcher

## Poject Description

## Basic Features
- Dispatcher can create new task for specified driver over 24 hour / 7 day / 52 week period
- Task time interval can be between 1-24 hours, but not extend across multiple days
- Application gives the dispatcher the option to overwrite existing tasks if conflict occurs
- Dispatcher is able to update time, description and location of existing tasks
- Dispatcher can delete tasks
- Dispatcher is able to select one of 3 drivers from a drop down to view the specified driver's timetable
- Dispatcher can download a .csv file outlining a specific driver's tasks for a given time-frame. Valid time frames for which the dispatcher can generate a driver report are: 2, 4, 7, 14, and 28 days. 

## Setup
1. Fork and clone this repo
2. Navigate to the root directory and install the project dependencies on your local machine using this command 
``` 
npm install 
```
3. Run the following command to get the app up and running
```
npm start
```
4. Open your browser and visit http://localhost:3000/

## Project Stack
- React
- Node
- JSX
- HTML
- JavaScript
- CSS

## Project Dependencies 
- react
- react-dom
- react-scripts
- react-csv
- bootstrap
- jquery
- popper.js
