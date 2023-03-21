import React, { createContext, useState } from 'react';
import { DateTime } from 'luxon';
import { defaultTimezone } from '../../utils/common';

import type { ReactNode } from 'react';

type props = {
  currentDate?: number,
  timezone: string,
  children: ReactNode
}

export type selectedDateType = null | DateTime;
export type currentDatetimeType = DateTime;
export type selectedTimeZoneType = string;
export type onChangeTimezoneType = (timezone: string) => void; 
export type onChangeSelectedDate = (date: DateTime) => void;

interface IsDateSlotPickCtx {
  currentDatetime: currentDatetimeType
  selectedDate: selectedDateType
  timezone: selectedTimeZoneType
  onChangeTimezone: onChangeTimezoneType
  onChangeSelectedDate: onChangeSelectedDate
}
const defaultCtx = {
  currentDatetime: DateTime.now(),
  selectedDate: null, 
  timezone: defaultTimezone,
  onChangeTimezone: (timezone: string) => {},
  onChangeSelectedDate: (time: DateTime) => {}
}

export const DateSlotPickCtx = createContext<IsDateSlotPickCtx>(defaultCtx)

export const DateSlotPickContext = ({ currentDate, timezone, children}: props) => {
  const [ selectedDate, setSelectedDate ] = useState<selectedDateType>(null);
  const [ selectedTimeZone, setSelectedTimeZone ] = useState<string>(timezone);

  const currentDatetime = currentDate ? DateTime.fromMillis(currentDate).setZone(timezone) : DateTime.now().setZone(timezone); 

  const onChangeTimezone = (timeZone: string) => {
    setSelectedTimeZone(timeZone)
  };

  const onChangeSelectedDate:onChangeSelectedDate = (date) => {
    setSelectedDate(date)
  };

  const ctxProps = {
    currentDatetime,
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