import React, { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { START, END } from '../constant';

type props = {
  currentDate?: number
  startDate?: number
  endDate?: number
  children: ReactNode
};

type currentDatetimeType = Date;
type selectedDateType = null | Date;
type perodDatetime = Date | 1;
type isLoadingType = boolean;

const getDatetime = (timeStamp: number | undefined, period: typeof START | typeof END) => {
  
  if (timeStamp){
    return new Date(timeStamp)
  }

  const currentDatetime = new Date();
  const currentYaer = currentDatetime.getFullYear();

  if (period === START){
    currentDatetime.setFullYear(currentYaer - 100)
  };

  if (period === END){
    currentDatetime.setFullYear(currentYaer +100)
  }

  return currentDatetime

};

const getCurrentDatetime = (timeStamp: number | undefined) => {
  if (timeStamp){
    return new Date(timeStamp)
  }

  return new Date()
}

export const DateSlotPickCtx = createContext({
  currentDatetime: new Date(),
  startDatetime: new Date(),
  endDatetime: new Date()
})

export const DateSlotPickContext = ({
  currentDate,
  startDate,
  endDate,
  children
}:props) => {
  const [isLoading, setIsLoading] = useState<isLoadingType>(false);
  const [selectedDate, setSelectedDate] = useState<selectedDateType>(null);
  const [selecedTimeslot, setSelecedTimeslot] = useState(null);

  const currentDatetime:currentDatetimeType = getCurrentDatetime(currentDate)
  const startDatetime:perodDatetime  = useMemo(() => getDatetime(startDate, START), []);
  const endDatetime:perodDatetime = useMemo(() => getDatetime(endDate, END), []);

  const onChangeIsLoading = () => {
    setIsLoading(prevState => !prevState)
  }

  return (
    <DateSlotPickCtx.Provider
      value={{currentDatetime, startDatetime, endDatetime}}
    >
      {children}
    </DateSlotPickCtx.Provider>
  )
};
