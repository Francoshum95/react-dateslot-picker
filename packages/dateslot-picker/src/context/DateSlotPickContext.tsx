import React, { createContext, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { defaultTimezone } from '../utils/common';
import {START, END} from '../components/constant';

import type { ReactNode } from 'react';
import { IsDateSlotPicker } from '../components';

type props = IsDateSlotPicker & {
  timezone: string,
  children: ReactNode
}

export type selectedDateType = null | DateTime;
export type DatetimeType = DateTime;
export type selectedTimezoneType = string;
export type onChangeTimezoneType = (timezone: string) => void; 
export type onChangeSelectedDate = (date: DateTime) => void;

interface IsDateSlotPickCtx {
  startDatetime: DatetimeType
  endDatetime: DatetimeType
  currentDatetime: DatetimeType
  selectedDate: selectedDateType
  timezone: selectedTimezoneType
  onChangeTimezone: onChangeTimezoneType
  onChangeSelectedDate: onChangeSelectedDate
}
const defaultCtx = {
  startDatetime: DateTime.now(),
  endDatetime: DateTime.now(),
  currentDatetime: DateTime.now(),
  selectedDate: null, 
  timezone: defaultTimezone,
  onChangeTimezone: (timezone: string) => {},
  onChangeSelectedDate: (time: DateTime) => {}
}

const getDatetime = ({
  timeStamp,
  period,
  timezone,
}: {
  timeStamp?: number;
  period: typeof START | typeof END;
  timezone: selectedTimezoneType;
}) => {
  
  if (timeStamp) {
    return DateTime.fromMillis(timeStamp).setZone(timezone);
  }

  const currentDatetime = DateTime.now().setZone(timezone);
  const currentYaer = currentDatetime.year;

  if (period === START) {
    return DateTime.fromObject({
      year: currentYaer - 100, month: 1
    }).setZone(timezone);
  }

  if (period === END) {
    return DateTime.fromObject({
      year: currentYaer + 100, month: 1
    }).setZone(timezone);
  }

  return currentDatetime
};

export const DateSlotPickCtx = createContext<IsDateSlotPickCtx>(defaultCtx)

export const DateSlotPickContext = ({ startDate, endDate, currentDate, timezone, children}: props) => {
  const [ selectedDate, setSelectedDate ] = useState<selectedDateType>(null);
  const [ selectedTimeZone, setSelectedTimeZone ] = useState<string>(timezone);

  const startDatetime = useMemo(
    () => getDatetime({ timeStamp: startDate, period: START, timezone }),
    [timezone]
  );
  const endDatetime = useMemo(
    () => getDatetime({ timeStamp: endDate, period: END, timezone }),
    [timezone]
  );
  const currentDatetime = currentDate ? DateTime.fromMillis(currentDate).setZone(timezone) : 
    DateTime.now().setZone(timezone); 

  const onChangeTimezone = (timeZone: string) => {
    setSelectedTimeZone(timeZone)
  };

  const onChangeSelectedDate:onChangeSelectedDate = (date) => {
    setSelectedDate(date)
  };

  const ctxProps = {
    currentDatetime,
    startDatetime,
    endDatetime,
    selectedDate,
    timezone: selectedTimeZone,
    onChangeTimezone,
    onChangeSelectedDate
  }

  return (
    <DateSlotPickCtx.Provider
      value={{...ctxProps}}
    >
      {children}
    </DateSlotPickCtx.Provider>
  )
};