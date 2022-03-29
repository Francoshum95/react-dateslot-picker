import React from 'react';
import DatePicker from '../src/components/Datepicker';
import TimePicker from '../src/components/TimePicker';
import useDateSlotPicker from '../src/useDateSlotPicker';
import datetimeParse from '../src/utlis/datetimeParse';



const DatePickerStory = ({
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
}) => {

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



export default {
  compoent: DatePickerStory,
  title: "DatePicker"
};

const Template = args => <DatePickerStory {...args}/>;

export const Default = Template.bind({});
Default.args = {
  isTimeslot: true,
  duration:30,
  startDate : 1,
  endDate : 1,
  dailyTimePair : [{
    startTime: [0, 0],
    endTime: [12, 0]
  },{
    startTime: [13, 0],
    endTime: [18, 0]
  },
  {
    startTime: [20, 0],
    endTime: [23, 0]
  }
  ],
  disableWeekly : [],
  disableSpecific : [],
  disableTimeslot : [],
  disableDate : [],
  timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone,
  onClickCalendar: () => {},
  onClickTimeslot: () => {},
  styles:"dark"
}










