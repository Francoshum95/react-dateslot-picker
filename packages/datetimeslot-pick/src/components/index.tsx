import DatePicker from './DatePicker';
import TimeSlotpick from './TimeSlotpick';
import { DateSlotPickContext } from '../context/DateSlotPickContext';
import { defaultTimezone } from '../utils/common';
import { defaultDuraiton } from './constant';

export interface IsDateSlotPicker {
  startDate?: number;
  endDate?: number;
  currentDate?: number;
  dailyTimePair?: [
    {
      startTime: number[];
      endTime: number[];
    }
  ];
  disableWeekly?: (string|number)[] 
  disableSpecific?: (string|number)[] 
  disableDate?: number[];
  timezone?: string;
  duration?: number
}

const DateSlotPicker = (props: IsDateSlotPicker) => {
  const { currentDate } = props;
  const timezone = props.timezone || defaultTimezone;

  const ctxProps = {
    timezone,
    currentDate,
  }

  return (
    <DateSlotPickContext {...ctxProps}>
      <DatePicker/>
      <TimeSlotpick/>
    </DateSlotPickContext>
  );
};

export default DateSlotPicker
