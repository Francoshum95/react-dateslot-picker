import { useContext } from 'react';
import useDatePicker from '../../hook/useDatePicker';
import { DateTime } from 'luxon';
import { DateSlotPickCtx, onChangeSelectedDate } from '../../context/DateSlotPickContext';
import { monthStr } from '../constant';

import type { calendarDateType, disableDateType } from '../../hook/useDatePicker';
import type { selectedDateType } from '../../context/DateSlotPickContext';
import type { IsDateSlotPicker } from '..';


interface CalendarDateType {
  calendarDate: calendarDateType
  selectedDate: selectedDateType
  startDatetime: DateTime
  endDatetime: DateTime,
  currentDatetime: DateTime
  disableWeeklyDay: disableDateType
  disableSpecificDate: disableDateType
  disableDatetime: disableDateType
  onChangeSelectedDate: onChangeSelectedDate
};

const weeklyStr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as string[];

const stylesMap = {
  bg: {
    dark: 'dateslotpicker-bg-[#1e1c22]',
  },
  headerColor: {
    dark: ' dateslotpicker-text-red-500',
  },
  selectedDate: {
    dark: 'dateslotpicker-rounded-full dateslotpicker-bg-red-500 dateslotpicker-text-white'
  },
  today: {
    dark: 'dateslotpicker-text-green-500 dateslotpicker-bg-transparent'
  },
  availableDate: {
    dark: 'dateslotpicker-text-white dateslotpicker-bg-transparent'
  }
};

const EmptyDate = () => (
  <div className="dateslotpicker-w-8 dateslotpicker-h-8 
  dateslotpicker-flex dateslotpicker-items-center dateslotpicker-justify-center"></div>
);

const DisableDate = ({
  isToday,
  calendarDate,
}: {
  isToday: boolean,
  calendarDate:DateTime, 
}) => (
  <button className={`dateslotpicker-w-8 dateslotpicker-h-8 dateslotpicker-flex 
  dateslotpicker-items-center dateslotpicker-justify-center 
  dateslotpicker-no-underline dateslotpicker-bg-none 
  dateslotpicker-outline-none dateslotpicker-border-none
  dateslotpicker-bg-transparent
  ${isToday ? 'dateslotpicker-text-green-500' : 
  'dateslotpicker-text-gray-500'}`}
  disabled={true}
  >
    {typeof calendarDate === 'string' ? "" : calendarDate.day}
  </button>
);

const AvailableDate = ({
  isToday,
  selectedDate,
  calendarDate,
  onChangeSelectedDate
}: {
  isToday: boolean,
  selectedDate: selectedDateType,
  calendarDate:DateTime, 
  onChangeSelectedDate: onChangeSelectedDate }) => {
  
  const isSelected = selectedDate?.toISODate() === calendarDate.toISODate();

  return (
    <button
      className={`dateslotpicker-w-8 dateslotpicker-h-8 dateslotpicker-flex 
      dateslotpicker-items-center dateslotpicker-justify-center
      dateslotpicker-no-underline dateslotpicker-bg-none 
      dateslotpicker-outline-none dateslotpicker-border-none
      ${isSelected ? stylesMap['selectedDate']['dark'] : 
        isToday ? stylesMap['today']['dark'] : stylesMap['availableDate']['dark']
      } dateslotpicker-cursor-pointer`}
      onClick={() => onChangeSelectedDate(calendarDate)}
      disabled={isSelected}
    >
      {calendarDate.day}
    </button>
  )
};

const CalendarDate = (props: CalendarDateType) => {
  const {selectedDate, currentDatetime, 
    calendarDate, disableDatetime, 
    disableSpecificDate, disableWeeklyDay, 
    onChangeSelectedDate} = props;

  if (typeof calendarDate === 'string') {
    return <EmptyDate/>
  };
  
  const isToday = currentDatetime.toISODate() === calendarDate.toISODate();

  if ( typeof calendarDate === 'string' ||
    disableWeeklyDay.includes(calendarDate.weekday) || 
    disableSpecificDate.includes(calendarDate.day) ||
    disableDatetime.includes(calendarDate.toMillis()) ||
    calendarDate.toISODate() < currentDatetime.toISODate()
  ){
    return <DisableDate
      isToday={isToday}
      calendarDate={calendarDate}
    />
  }

  return <AvailableDate
    isToday={isToday}
    selectedDate={selectedDate}
    calendarDate={calendarDate}
    onChangeSelectedDate={onChangeSelectedDate}
  />
};

const DatePicker = (props: IsDateSlotPicker) => {
  const { startDate, endDate, disableWeekly, disableSpecific, disableDate } = props;
  const {currentDatetime, onChangeSelectedDate} = useContext(DateSlotPickCtx); 

  const {
    isForwardDisable,
    isPreviousDisable,
    startDatetime,
    selectedDate,
    endDatetime,
    calendarArray,
    calendarPeriod,
    disableWeeklyDay,
    disableSpecificDate,
    disableDatetime,
    onChangeCalendarPeriod,
  } = useDatePicker({
    startDate,
    endDate,
    disableWeekly,
    disableSpecific,
    disableDate,
  });

  const calendarDateProps = {
    startDatetime,
    endDatetime,
    currentDatetime,
    selectedDate,
    disableWeeklyDay,
    disableSpecificDate,
    disableDatetime,
    onChangeSelectedDate,
  };

  return (
    <div className={`dateslotpicker-w-[18rem] dateslotpicker-h-[17rem] md:dateslotpicker-h-[18rem] dateslotpicker-rounded-tl-2xl 
    dateslotpicker-rounded-tr-2xl md:dateslotpicker-rounded-tl-2xl md:dateslotpicker-rounded-bl-2xl 
    md:dateslotpicker-rounded-tr-none dateslotpicker-select-none ${stylesMap['bg']['dark']}`}>
      <div className="md:dateslotpicker-p-5 dateslotpicker-pt-5 dateslotpickerpx-5">
        <div
          className={`dateslotpicker-w-4/5 dateslotpicker-flex dateslotpicker-justify-between 
          dateslotpicker-mx-auto dateslotpicker-px-1 ${stylesMap['headerColor']['dark']}`}
        >
          <div className="dateslotpicker-font-bold">
            <span 
              data-testid="calendar-month"
              className='dateslotpicker-text-sm'>{monthStr[calendarPeriod.month]}</span>
            <span 
              data-testid="calendar-year"
              className='dateslotpicker-ml-2'>{calendarPeriod.year}</span>
          </div> 
          <div className="dateslotpicker-flex dateslotpicker-w-1/5 dateslotpicker-justify-between">
            <button
              data-testid="button-previous"
              className={`dateslotpicker-no-underline dateslotpicker-bg-none 
              dateslotpicker-outline-none dateslotpicker-border-none
              dateslotpicker-bg-transparent dateslotpicker-cursor-pointer
              ${
                isPreviousDisable && "dateslotpicker-hidden"
              }`}
              disabled={isPreviousDisable}
              onClick={() => onChangeCalendarPeriod("previous")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`dateslotpicker-h-4 dateslotpicker-w-4 ${stylesMap['headerColor']['dark']}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              data-testid="button-forward"
              className={`dateslotpicker-no-underline dateslotpicker-bg-none 
              dateslotpicker-outline-none dateslotpicker-border-none
              dateslotpicker-bg-transparent dateslotpicker-cursor-pointer
              ${
                isForwardDisable && "dateslotpicker-hidden"
              }`}
              disabled={isForwardDisable}
              onClick={() => onChangeCalendarPeriod("forward")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`dateslotpicker-h-4 dateslotpicker-w-4 ${stylesMap['headerColor']['dark']}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="dateslotpicker-grid dateslotpicker-grid-cols-7 
          dateslotpicker-text-xs dateslotpicker-w-4/5 dateslotpicker-mx-auto">
          {weeklyStr.map((str, index) => (
            <div key={index} className="dateslotpicker-w-7 dateslotpicker-h-7 
            dateslotpicker-text-gray-500 dateslotpicker-flex dateslotpicker-items-center dateslotpicker-justify-center">
              {str}
            </div>
          ))}
          {
            calendarArray.map(calendarDate => {
              const props = {...calendarDateProps, calendarDate};
              return (
                <CalendarDate
                  {...props}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
