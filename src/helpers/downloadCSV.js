import { generateTaskListItems } from "./helpers";

const dayStringToNum = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const headers = [
  {label: "Time-Frame", key: "timeframe"},
  {label: "Pickup", key:"pickup"},
  {label: "Drop-off", key:"dropoff"},
  {label: "Other", key: "other"}
];

const downloadCSV = (numDays, schedule) => {
  const data = [];

  let date = getFirstDayOfCurrentYear();
  
  for (let counter = 1; counter < 365; counter += numDays) {
    const row = generateRow(counter, date, numDays, schedule);

    data.push(row);
    // Adjust date
    date = addDaysToDate(date, numDays);
  }
  console.log(data);
}

const generateRow = (counter, date, numDays, schedule) => {
  if (numDays + counter >= 365) {
    numDays = 365 - counter;
  }
 
  const timeframe = `Day ${counter} - Day ${counter + numDays}`;
  const row = {
    timeframe, 
    pickup: 0,
    dropoff: 0,
    other: 0
  }

  for (let i = 0; i < numDays; i++) {
    const week = getWeekFromDate(date);
    const day = dayStringToNum[date.getDay()];

    if (schedule[`Week${week}`]) {
      if(schedule[`Week${week}`][day]) {
        for (const task of Object.values(schedule[`Week${week}`][day])) {
          if (task.task === "Pickup Goods") {
            row.pickup += 1;
          } else if (task.task === "Deliver Goods") {
            row.dropoff += 1;
          } else {
            row.other += 1;
          }
        }
      }
    }
    date = addDaysToDate(date, 1);
  }
  return row;
}

const getFirstDayOfCurrentYear = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  return oneJan;
};

const getWeekFromDate = (date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay()+1)/7);
}

const addDaysToDate = (date, numDays) => {
  const newDate = date.setDate(date.getDate() + numDays);
  return new Date(newDate);
}

export { downloadCSV }

