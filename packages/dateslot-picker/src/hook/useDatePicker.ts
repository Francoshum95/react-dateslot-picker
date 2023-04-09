import { useState, useContext, useEffect, useMemo } from 'react';
import { DateSlotPickCtx } from '../context/DateSlotPickContext';
import {
  FIRST_MONTH,
  LAST_MONTH,
  FORWARD,
  PREVIOUS,
} from '../components/constant';
import { DateTime } from 'luxon';
import type { IsDateSlotPicker } from '../components';
import type { selectedTimezoneType } from '../context/DateSlotPickContext';

export type calendarPeriodType = {
  year: number;
  month: number;
};
export type onChangeCalendarPeriodType = (
  direction: typeof FORWARD | typeof PREVIOUS
) => void;
export type calendarDateType = (DateTime | string)
export type calendarArrayType = calendarDateType[];
export type disableDateType = number [];
export type disableControllerType = boolean;

const getCalendarArray = (
  calendarPeriod: calendarPeriodType,
  timezone: selectedTimezoneType
) => {
  let initialDate = DateTime.fromObject({
    year: calendarPeriod.year,
    month: calendarPeriod.month,
  }).setZone(timezone);
  const calendarArray:calendarArrayType = [] 

  while (initialDate.month === calendarPeriod.month) {
    calendarArray.push(initialDate);
    initialDate = initialDate.set({day: initialDate.day + 1}).setZone(timezone);
  }

  const firstElement = calendarArray[0];
  const lastElement = calendarArray[calendarArray.length - 1];

  if (firstElement instanceof DateTime && lastElement instanceof DateTime) {
    const startDate = firstElement.weekday;
    const endDate = lastElement.weekday;
    
    if (startDate !== 2) {

      for (let numString = 0; startDate > numString; numString++) {
        calendarArray.unshift('');
      }
    }

    if (endDate !== 7) {
      for (let numString = 0; 7 - endDate > numString; numString++) {
        calendarArray.push('');
      }
    }
  }

  return calendarArray;
};

const getDisable = (disable: IsDateSlotPicker['disableSpecific'] | IsDateSlotPicker['disableWeekly']) => {
  const dateArray: disableDateType = [];

  if (!disable || disable.length === 0){
    return dateArray
  };

  disable.forEach(date => {
    if (typeof date === 'string'){
      const splitDate = date.split('-');

      const startIndex = parseInt(splitDate[0], 10);
      const endIndex = parseInt(splitDate[1], 10);

      if (isNaN(endIndex)) {
        dateArray.push(startIndex);
      } else {
        for (let i = startIndex; endIndex >= i; i++) {
          dateArray.push(i);
        }
      }
    } else {
      dateArray.push(date)
    }
  });

  return dateArray
};

const adjustDisableDate = (dates:number [] | null | undefined, timezone: string) => {
  const disableDate:disableDateType = [];
  if (dates){
    dates.forEach(date => {
      const disableDateTime = DateTime.fromMillis(date);
      const adjestDate = DateTime.fromObject({
        year: disableDateTime.year,
        month: disableDateTime.month,
        day: disableDateTime.day
      }).setZone(timezone).toMillis()

      disableDate.push(adjestDate);
    }); 
  };

  return disableDate
};

const initialCalendarPeriod = ({
  currentDatetime,
  startDatetime,
}: {
  currentDatetime: DateTime
  startDatetime: DateTime
}) => {
  if (currentDatetime.toMillis() < startDatetime.toMillis()){
    return {
      year: startDatetime.year,
      month: startDatetime.month
    }
  };

  return {
    year: currentDatetime.year,
    month: currentDatetime.month 
  }
};

const useDatePicker = (props: IsDateSlotPicker) => {
  const {disableWeekly, disableSpecific, disableDate } = props;
  const {
    selectedDate,
     currentDatetime, 
     startDatetime,
     endDatetime,
     timezone, 
     onChangeSelectedDate } = useContext(DateSlotPickCtx);

  const [calendarPeriod, setCalendarPeriod] = useState<calendarPeriodType>(initialCalendarPeriod({
    currentDatetime,
    startDatetime,
  }));

  const calendarArray = useMemo(
    () => getCalendarArray(calendarPeriod, timezone),
    [calendarPeriod.year, calendarPeriod.month, timezone]
  );
  const disableWeeklyDay = useMemo(() => getDisable(disableWeekly), []);
  const disableSpecificDate = useMemo(() => getDisable(disableSpecific), []);
  const disableDatetime = useMemo(() => adjustDisableDate(disableDate, timezone), [timezone])

  const isForwardDisable:disableControllerType = currentDatetime.toMillis() >= endDatetime.toMillis() || 
    (calendarPeriod.year === endDatetime.year && calendarPeriod.month === endDatetime.month);
  const isPreviousDisable:disableControllerType = currentDatetime.toMillis() >= endDatetime.toMillis() || 
    (calendarPeriod.year <= startDatetime.year && calendarPeriod.month <= startDatetime.month);

  useEffect(() => {
    const initialSelectedDate = () => {
      const isOutofRange = currentDatetime.toMillis() > endDatetime.toMillis();
      const adjestCurrentDatetime = DateTime.fromObject({
        year: currentDatetime.year,
        month: currentDatetime.month,
        day: currentDatetime.day
      }).setZone(timezone);

      let selectedDate = adjestCurrentDatetime;
      
      if (!isOutofRange) {
        while (
          selectedDate.toMillis() < endDatetime.toMillis() && (
          disableWeeklyDay.includes(selectedDate.weekday) || 
          disableSpecificDate.includes(selectedDate.day) || 
          disableDatetime.includes(selectedDate.toMillis()))
          ){
          selectedDate = selectedDate.plus({
            day: 1
          })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        }
        onChangeSelectedDate(selectedDate);
      }
    };

    initialSelectedDate();
 
  },[timezone]);
  
    const onChangeCalendarPeriod: onChangeCalendarPeriodType = (driection) => {
    const cloneCalendarPeriod = { ...calendarPeriod };
    const { month, year } = cloneCalendarPeriod;

    if (driection === FORWARD) {
      cloneCalendarPeriod.month = month === LAST_MONTH ? 1 : month + 1;
      cloneCalendarPeriod.year = month === LAST_MONTH ? year + 1 : year;
    }

    if (driection === PREVIOUS) {
      cloneCalendarPeriod.month = month === FIRST_MONTH ? 12 : month - 1;
      cloneCalendarPeriod.year = month === FIRST_MONTH ? year - 1 : year;
    }

    setCalendarPeriod(cloneCalendarPeriod);
  };

  return {
    selectedDate,
    isForwardDisable,
    isPreviousDisable,
    endDatetime,
    calendarArray,
    calendarPeriod,
    disableWeeklyDay,
    disableSpecificDate,
    disableDatetime,
    onChangeCalendarPeriod,
  };
};

export default useDatePicker;
