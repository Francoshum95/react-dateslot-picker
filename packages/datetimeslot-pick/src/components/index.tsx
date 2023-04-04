import DatePicker from './DatePicker';
import TimeSlotpick from './TimeSlotpick';
import { DateSlotPickContext } from '../context/DateSlotPickContext';
import { defaultTimezone } from '../utils/common';

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
  const { startDate, endDate, disableWeekly, disableSpecific, disableDate, currentDate } = props;
  const timezone = props.timezone || defaultTimezone;

  const ctxProps = {
    timezone,
    currentDate,
  }
  const datePickerProps = {
    startDate,
    endDate,
    disableWeekly,
    disableSpecific,
    disableDate
  }

  return (
    <DateSlotPickContext {...ctxProps}>
      <DatePicker
        {...datePickerProps}
      />
      <TimeSlotpick/>
    </DateSlotPickContext>
  );
};

export default DateSlotPicker
