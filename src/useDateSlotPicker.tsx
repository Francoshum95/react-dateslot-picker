import { useState, useEffect, useMemo } from 'react';
import { getCurrentDate,  checkIfEndPeriod, checkIfStartPeriod, getCalendarArray} from './utlis/Utilities';
import { CALENDARALL, CALENDARLAST, CALENDARBEGIN, CALENDARNORMAL, CALENDARFIX, stylesArray} from './constant';
import { useDatePickerProps, selectedMonthDateProps, getTimeslotProps, getTimeProps} from './type/useDatePicker.type';

const getTime = ({timeslot, startDatetime, endDatetime, duration, timeZone, currentDate, index, indexDate}: getTimeProps) : Date[] | getTimeProps => {
  const timeDelta = startDatetime.getTime() + duration * 60000;
  const newDate = new Date (new Date (timeDelta).toLocaleString("en-US", {timeZone: timeZone }));


  if (startDatetime >= endDatetime || newDate >= endDatetime || newDate.getDate() !== indexDate) {
    return timeslot;
  } 

  if (timeslot.length > 2){
    if (timeslot[index -1] > newDate){
      return timeslot;
    }
  }

  timeslot.push(newDate);

  return getTime({ timeslot, startDatetime: newDate, endDatetime, duration, timeZone, currentDate, index, indexDate});

}

const getTimeslot = ({isTimeslot, dailyTimePair, duration, timeZone, selectedDate}:getTimeslotProps) => {
  let timeslot: Date[] = [];
  
  if (isTimeslot && selectedDate){
    const currentDate = getCurrentDate(timeZone);
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

  
    const indexStarttime = new Date (new Date(year, month, day, dailyTimePair[0].startTime[0], dailyTimePair[0].startTime[1], 0).toLocaleString("en-US", {timeZone: timeZone }))
    const indexDate = indexStarttime.getDate();
    timeslot.push(indexStarttime);

    dailyTimePair.forEach((time: {startTime: number[], endTime: number[]}, index:number) => {
      const startDatetime = new Date (new Date(year, month, day, time.startTime[0], time.startTime[1], 0).toLocaleString("en-US", {timeZone: timeZone }))
      const endDatetime =  new Date (new Date( year, month, day,time.endTime[0],time.endTime[1],0).toLocaleString("en-US", {timeZone: timeZone }))

      getTime({ timeslot, startDatetime, endDatetime, duration, timeZone, currentDate, index, indexDate});
    })

  };
  return timeslot;
}


const initMonth = (startDatetime: Date | number, currentDatetime: Date) => {
  if (typeof startDatetime === 'number'){
    return {
      year: currentDatetime.getFullYear(),
      month: currentDatetime.getMonth()
    }
  }

  if (startDatetime > currentDatetime){
    return {
      year: startDatetime.getFullYear(),
      month: startDatetime.getMonth()
    }
  }

  return {
    year: currentDatetime.getFullYear(),
    month: currentDatetime.getMonth()
  }
}

const initCalendarToggle = (calendarType: string) => {
  switch (calendarType){
    case CALENDARALL: 
      return { 
        previousPeriod: true,
        nextPeriod: true,
      };
    case CALENDARLAST: 
      return { 
        previousPeriod: false,
        nextPeriod: true,
      };
    case CALENDARFIX: 
      return {
        previousPeriod: false,
        nextPeriod: false,
      }
    case CALENDARBEGIN: 
      return {
        previousPeriod: true,
        nextPeriod: true,
      }
    case CALENDARNORMAL: 
      return {
        previousPeriod: false,
        nextPeriod: true,
      }
    default:
      return {
        previousPeriod: true,
        nextPeriod: true,
      }
  } 
}

const getStyles = (styles: string) => {
  if (stylesArray.includes(styles)){
    return styles
  } 
  return 'dark'
};

export default function useDateSlotPicker({
  isTimeslot,
  duration,
  dailyTimePair,
  timeZone,
  styles,
  startDatetime,
  endDatetime,
  calendarType,
  onClickCalendar,
  onClickTimeslot
}: useDatePickerProps){
  const currentDatetime = getCurrentDate(timeZone);
  const [selectedMonth, setselectedMonth] = useState<selectedMonthDateProps>(initMonth(startDatetime, currentDatetime));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<Date | null>(null);
  const [calendarToggle, setCalendarToggle] = useState(initCalendarToggle(calendarType));

  useEffect(() => {
    const disableToggle = () => {

      const isEndPeriod = checkIfEndPeriod({selectedMonth, endDatetime});
      const isStartPeriod = checkIfStartPeriod({selectedMonth, startDatetime});

      switch(calendarType){
        case CALENDARALL: 
          break 
        case CALENDARLAST:
          if (isStartPeriod){
            setCalendarToggle({
              previousPeriod: false,
              nextPeriod: true,
            })
          } else {
            setCalendarToggle({
              previousPeriod: true,
              nextPeriod: true,
            })
          }
          break
        case CALENDARFIX:
          break 
        case CALENDARBEGIN: 
          if (isEndPeriod){
            setCalendarToggle({
              previousPeriod: true,
              nextPeriod: false,
            })
          } else {
            setCalendarToggle({
              previousPeriod: true,
              nextPeriod: true,
            })
          }
          break
        case CALENDARNORMAL: 
          if (isEndPeriod){
            setCalendarToggle({
              previousPeriod: true,
              nextPeriod: false,
            })
          } else if (isStartPeriod){
            setCalendarToggle({
              previousPeriod: false,
              nextPeriod: true,
            })
          } else {
            setCalendarToggle({
              previousPeriod: true,
              nextPeriod: true,
            })
          }
          break
      }
    }
    disableToggle();
    
  }, [selectedMonth])

  const handleToggleForward = () => {
    if (selectedMonth.month === 11){
      setselectedMonth({
        year: selectedMonth.year +1,
        month: 0
      })
    } else {
      setselectedMonth({
        ...selectedMonth,
        month: selectedMonth.month +1
      })
    }
  }

  const handleTogglePrevious = () => {
    if (selectedMonth.month === 0){
      setselectedMonth({
        year: selectedMonth.year - 1 ,
        month: 11
      })
    } else {
      setselectedMonth({
        ...selectedMonth,
        month: selectedMonth.month -1 
      })
    }
  }

  const onclickSelecteDate = (selected: Date): void => {
    setSelectedDate(selected);
    onClickCalendar(selected);
    setSelectedTimeslot(null);
  }

  const onClickSelectedTimeslot = (selected: Date, timeStamp: number): void => {
    setSelectedTimeslot(selected);
    onClickTimeslot(timeStamp);
  }

  const calendarMonthlyArray = useMemo(() => {return getCalendarArray(selectedMonth.year, selectedMonth.month, timeZone)}, [selectedMonth]);
  const timeslotArray = useMemo(() => {return getTimeslot({isTimeslot, dailyTimePair, duration, timeZone, selectedDate})}, [selectedDate]);
  const calendarStyles = useMemo(() => {return getStyles(styles)}, [styles]);

  return {
    selectedDate,
    selectedMonth,
    calendarMonthlyArray,
    timeslotArray,
    calendarStyles,
    calendarToggle,
    handleToggleForward,
    handleTogglePrevious,
    onclickSelecteDate,
    selectedTimeslot,
    onClickSelectedTimeslot
  }

}