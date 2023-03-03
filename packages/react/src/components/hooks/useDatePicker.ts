import { useState, useContext } from 'react';
import { DateSlotPickCtx } from '../context/DateSlotPickContext';
import { 
  FIRST_MONTH,
  LAST_MONTH,
  FORWARD, 
  PREVIOUS } from '../constant';

type calendarPeriodType = {
  year: number,
  month: number
};
type onChangeCalendarPeriodType = (direction: typeof FORWARD | typeof PREVIOUS) => void;

const getInitMonth = (props: {
  startDatetime: Date | 1,
  endDatetime: Date | 1,
  currentDatetime: Date
}) => {
  const {startDatetime, endDatetime, currentDatetime} = props;

  const initialMonth = {
    year: currentDatetime.getFullYear(),
    month: currentDatetime.getMonth()
  }

  if (startDatetime == 1 || 
    (endDatetime != 1 && endDatetime > currentDatetime )){
    return initialMonth
  }

  if (startDatetime > currentDatetime){
    initialMonth.year = startDatetime.getFullYear()
    initialMonth.month = startDatetime.getMonth()
  }

  return initialMonth
};

const useDatePicker = () => {
  const {currentDatetime, startDatetime , endDatetime} = useContext(DateSlotPickCtx);

  const [calendarPeriod, setCalendarPeriod] = useState<calendarPeriodType>(getInitMonth({
    startDatetime,
    endDatetime,
    currentDatetime
  }))

  const onChangeCalendarPeriod:onChangeCalendarPeriodType = (driection) => {
    const cloneCalendarPeriod = {...calendarPeriod};  
    const { month, year } = cloneCalendarPeriod;
    
    if (driection === FORWARD){
      cloneCalendarPeriod.month = month === LAST_MONTH ? 0 : month + 1; 
      cloneCalendarPeriod.year =  month === LAST_MONTH ? year + 1 : year;
    }

    if (driection === PREVIOUS){
      cloneCalendarPeriod.month = month === FIRST_MONTH ? 11 : month - 1; 
      cloneCalendarPeriod.year =  month === FIRST_MONTH ? year - 1 : year;
    }
    
    setCalendarPeriod(cloneCalendarPeriod)
  };


  return {
    calendarPeriod,
    onChangeCalendarPeriod
  }
};

export default useDatePicker