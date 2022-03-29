import { checkStartPeriodProps, checkEndPeriodProps } from "../type/Utilities.type";

export function getDatetime(timeStamp: string | number, timeZone: string) {
  if (typeof timeStamp === "string") {
    const intTimeStamp = parseInt(timeStamp, 10);

    if (intTimeStamp){
      return new Date (new Date(intTimeStamp * 1000).toLocaleString("en-US", {
        timeZone: timeZone,
      }));
    }
  } else if (typeof timeStamp === "number") {
    if (timeStamp === 1){
      return timeStamp
    }
    return new Date (new Date(timeStamp * 1000).toLocaleString("en-US", {
      timeZone: timeZone,
    }));
  }

  return 1
}

export function getCurrentDate(timeZone: string){
  return new Date (new Date().toLocaleString("en-US", {timeZone: timeZone }))
}


export function checkIfEndPeriod({selectedMonth, endDatetime}: checkEndPeriodProps){
  if (typeof endDatetime === "number"){
    return false
  }
  return selectedMonth.year === endDatetime.getFullYear() && selectedMonth.month === endDatetime.getMonth() 
}

export function checkIfStartPeriod({selectedMonth, startDatetime}: checkStartPeriodProps){
  if (typeof startDatetime === "number"){
    return false
  }

  return selectedMonth.year === startDatetime.getFullYear() && selectedMonth.month === startDatetime.getMonth()
}

export function getCalendarArray(year: number, month:number, timeZone: string){
  let date = new Date(new Date(year, month, 1).toLocaleString("en-US", {timeZone: timeZone }));
  let days = [];

  while (date.getMonth() === month) {
    days.push(new Date (new Date(date).toLocaleString("en-US", {timeZone: timeZone })));
    date.setDate(date.getDate() + 1);
  }

  const startDate = days[0].getDay();
  const endDate = days[days.length - 1].getDay();
  
  if (startDate !== 0){
    for (let numString=0; startDate > numString; numString ++){
      days.unshift("")
    }
  }

  if (endDate !== 6){
    for (let numString=0; (6-endDate) > numString; numString ++){
      days.push("")
    }
  }

  return days
}

export function isToday(currentDate:Date, selectedDate: Date){
  if (currentDate.getDate() === selectedDate.getDate() && 
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()){
        return true
      } 
  return false;
}

export function getTimeslotString(time: Date){
  const hour = time.getHours().toString();
  const min = time.getMinutes().toString();

  const getString = (time:string)=> {
    if (time.length === 1){
      return `0${time}`
    }

    return time
  }

  return `${getString(hour)}: ${getString(min)}`
}



