import { useState, useContext, useMemo } from 'react';
import { DateSlotPickCtx } from '../context/DateSlotPickContext';
import { FIRST_MONTH, LAST_MONTH, FORWARD, PREVIOUS } from '../constant';

type calendarPeriodType = {
  year: number;
  month: number;
};
type selectedDate = null | Date;
type onChangeCalendarPeriodType = (
  direction: typeof FORWARD | typeof PREVIOUS
) => void;

const getCalendarArray = (calendarPeriod: calendarPeriodType) => {
  const initialDate = new Date(calendarPeriod.year, calendarPeriod.month, 1, 0);
  const calendarArray = [] as (Date | string)[];

  while (initialDate.getMonth() === calendarPeriod.month) {
    const cloneDate = new Date(initialDate);
    calendarArray.push(cloneDate);
    initialDate.setDate(initialDate.getDate() + 1);
  }

  const firstElement = calendarArray[0];
  const lastElement = calendarArray[calendarArray.length - 1];

  if (firstElement instanceof Date && lastElement instanceof Date) {
    const startDate = firstElement.getDay();
    const endDate = lastElement.getDay();

    if (startDate !== 0) {
      for (let numString = 0; startDate > numString; numString++) {
        calendarArray.unshift('');
      }
    }

    if (endDate !== 6) {
      for (let numString = 0; 6 - endDate > numString; numString++) {
        calendarArray.push('');
      }
    }
  }

  return calendarArray;
};

const useDatePicker = () => {
  const { currentDatetime, startDatetime, endDatetime } =
    useContext(DateSlotPickCtx);

  const [calendarPeriod, setCalendarPeriod] = useState<calendarPeriodType>({
    year: currentDatetime.getFullYear(),
    month: currentDatetime.getMonth(),
  });

  const [selectedDate, setSelectedDate] = useState<selectedDate>(null);
  const calendarArray = useMemo(
    () => getCalendarArray(calendarPeriod),
    [calendarPeriod.year, calendarPeriod.month]
  );

  const onChangeCalendarPeriod: onChangeCalendarPeriodType = (driection) => {
    const cloneCalendarPeriod = { ...calendarPeriod };
    const { month, year } = cloneCalendarPeriod;

    if (driection === FORWARD) {
      cloneCalendarPeriod.month = month === LAST_MONTH ? 0 : month + 1;
      cloneCalendarPeriod.year = month === LAST_MONTH ? year + 1 : year;
    }

    if (driection === PREVIOUS) {
      cloneCalendarPeriod.month = month === FIRST_MONTH ? 11 : month - 1;
      cloneCalendarPeriod.year = month === FIRST_MONTH ? year - 1 : year;
    }

    setCalendarPeriod(cloneCalendarPeriod);
  };


  return {
    calendarArray,
    calendarPeriod,
    onChangeCalendarPeriod,
  };
};

export default useDatePicker;
