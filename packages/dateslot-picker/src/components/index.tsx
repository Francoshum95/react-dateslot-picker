import DatePicker from './DatePicker';
import TimeSlotpicker from './TimeSlotPicker';
import { DateSlotPickContext } from '../context/DateSlotPickContext';
import { defaultTimezone } from '../utils/common';

export interface IsDateSlotPicker {
  startDate?: number;
  endDate?: number;
  currentDate?: number;
  dailyTimePair?: {
    startTime: number[];
    endTime: number[];
  }[];
  disableWeekly?: (string | number)[];
  disableSpecific?: (string | number)[];
  disableDate?: number[];
  fullBooking?: number[];
  timezone?: string;
  duration?: number;
  onSelectDatetime?: (timestamp: number) => any
}

const DateSlotPicker = (props: IsDateSlotPicker) => {
  const {
    startDate,
    endDate,
    disableWeekly,
    disableSpecific,
    disableDate,
    currentDate,
    duration,
    dailyTimePair,
    onSelectDatetime,
    fullBooking,
  } = props;
  const timezone = props.timezone || defaultTimezone;

  const ctxProps = {
    startDate,
    endDate,
    timezone,
    currentDate,
  };
  const datePickerProps = {
    disableWeekly,
    disableSpecific,
    disableDate,
  };
  const timeSlotPickerProps = {
    disableDate,
    duration,
    dailyTimePair, 
    fullBooking,
    onSelectDatetime
  };

  return (
    <DateSlotPickContext {...ctxProps}>
      <div className="dateslotpicker-flex 
      dateslotpicker-flex-col md:dateslotpicker-flex-row">
        <DatePicker {...datePickerProps}/>
        <TimeSlotpicker {...timeSlotPickerProps}/>
      </div>
    </DateSlotPickContext>
  );
};

export default DateSlotPicker;
