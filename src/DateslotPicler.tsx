import React from 'react';
import datetimeParse from "./utlis/datetimeParse";
import { DateSlotPickerProps } from "./type/DateSlotPicker.type";
import useDateSlotPicker from "./useDateSlotPicker";
import DatePicker from "./components/Datepicker";
import TimePicker from './components/TimePicker';

export default function DateSlotPicker({
  isTimeslot = false,
  duration=30,
  startDate = 1,
  endDate = 1,
  dailyTimePair = [{
    startTime: [0, 0],
    endTime: [11, 59]
  }],
  disableWeekly = [],
  disableSpecific = [],
  disableTimeslot = [],
  disableDate = [],
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  onClickCalendar = () => {},
  onClickTimeslot = () => {},
  styles="dark"
}: DateSlotPickerProps) {

  const {
    startDatetime,
    endDatetime,
    calendarType,
    disableWeeklyArray,
    disableSpecificArray,
    isError,
  } = datetimeParse({
    startDate,
    endDate,
    disableWeekly,  
    disableSpecific,
    timeZone,
  });

  const {
    selectedDate,
    selectedMonth,
    selectedTimeslot,
    calendarStyles,
    calendarMonthlyArray,
    timeslotArray,
    calendarToggle,
    handleToggleForward,
    handleTogglePrevious,
    onclickSelecteDate,
    onClickSelectedTimeslot
  } = useDateSlotPicker({
    isTimeslot,
    duration,
    dailyTimePair,
    timeZone,
    styles,
    startDatetime,
    endDatetime,
    calendarType, 
    onClickCalendar,
    onClickTimeslot
  });

  
  return (
    <div className='datesoltpicker-container'>
      <DatePicker
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        startDatetime={startDatetime}
        endDatetime={endDatetime}
        calendarStyles={calendarStyles}
        calendarMonthlyArray={calendarMonthlyArray}
        calendarToggle={calendarToggle}
        timeZone={timeZone}
        handleToggleForward={handleToggleForward}
        handleTogglePrevious={handleTogglePrevious}
        onclickSelecteDate={onclickSelecteDate}
        disableWeeklyArray={disableWeeklyArray}
        disableSpecificArray={disableSpecificArray}
        disableDate={disableDate}
        iSError={isError}
        styles={styles}
        isTimeslot={isTimeslot}
      />
      <TimePicker
        timeslotArray={timeslotArray}
        calendarStyles={calendarStyles}
        disableTimeslot={disableTimeslot}
        timeZone={timeZone}
        onClickSelectedTimeslot={onClickSelectedTimeslot}
        isTimeslot={isTimeslot}
        selectedDate={selectedDate}
        selectedTimeslot={selectedTimeslot}
      />
    </div>
  )
}