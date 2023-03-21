import { DateSlotPickContext } from './context/DateSlotPickContext';
import { defaultTimezone } from '../utils/common';

export interface IsDateSlotPicker {
  startDate?: number;
  endDate?: number;
  currentDate?: number;
  dailyTimePair: [
    {
      startTime: [];
      endTime: [];
    }
  ];
  disableWeekly: string[] | number[];
  disableSpecific: string[] | number[];
  disableDate: number[];
  timeZone?: string;
}

export const DateSlotPicker = (props: IsDateSlotPicker) => {
  const { currentDate, startDate, endDate } = props;
  const timezone = props.timeZone || defaultTimezone;

  const ctxProps = {
    timezone,
    currentDate
  }

  return (
    <DateSlotPickContext {...ctxProps}>hello world</DateSlotPickContext>
  );
};
