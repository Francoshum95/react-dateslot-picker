import React from 'react';
import {
  DatepickerProps,
  CalendarMapProps,
  AvailableDayProps,
  DisableDayProps,
} from '../type/Datepicker.type';
import { monthStr, weeklyStr, stylesMap } from '../constant';
import { getCurrentDate, isToday } from '../utlis/Utilities';

const EmptyDate = (): JSX.Element => {
  return <div className="calendar-empty-day"></div>;
};

const DisableDay = ({ date, calendarStyles }: DisableDayProps): JSX.Element => {
  return (
    <div className={`${stylesMap[calendarStyles]['calendar-disable-day']}`}>
      {date.getDate()}
    </div>
  );
};

const AvailableDay = ({
  date,
  calendarStyles,
  selectedDate,
  onclickSelecteDate,
}: AvailableDayProps): JSX.Element => {
  return (
    <div
      className={
        selectedDate === date
          ? `${stylesMap[calendarStyles]['calendar-selected-day']}`
          : `${stylesMap[calendarStyles]['calendar-available-day']}`
      }
      onClick={() => onclickSelecteDate(date)}
    >
      {date.getDate()}
    </div>
  );
};

const TodayAvailableDay = ({
  date,
  calendarStyles,
  selectedDate,
  onclickSelecteDate,
}: AvailableDayProps): JSX.Element => {
  return (
    <div
      className={
        date === selectedDate
          ? `${stylesMap[calendarStyles]['calendar-selected-day']}`
          : `${stylesMap[calendarStyles]['calendar-current-available-day']}`
      }
      onClick={() => onclickSelecteDate(date)}
    >
      {date.getDate()}
    </div>
  );
};

const TodayAndDisableDay = ({
  date,
  calendarStyles,
}: DisableDayProps): JSX.Element => {
  return (
    <div className={`${stylesMap[calendarStyles]['calendar-current-day']}`}>
      {date.getDate()}
    </div>
  );
};

const CalendarmMap = ({
  currentDate,
  calendarDay,
  startDatetime,
  endDatetime,
  calendarStyles,
  selectedDate,
  disableWeeklyArray,
  disableSpecificArray,
  disableDate,
  onclickSelecteDate,
}: CalendarMapProps): JSX.Element => {

  if (typeof calendarDay === 'string') {
    return <EmptyDate />;
  }


  const timestamp = calendarDay.valueOf() / 1000;
  const istoday = isToday(currentDate, calendarDay);

  if (
    disableWeeklyArray.includes(calendarDay.getDay()) ||
    disableSpecificArray.includes(calendarDay.getDate()) ||
    disableDate.includes(timestamp)
  ) {
    if (istoday) {
      return (
        <TodayAndDisableDay
          date={calendarDay}
          calendarStyles={calendarStyles}
        />
      );
    } else {
      return <DisableDay date={calendarDay} calendarStyles={calendarStyles} />;
    }
  }


  if (isToday(currentDate, calendarDay)) {
    return (
      <TodayAvailableDay
        date={calendarDay}
        calendarStyles={calendarStyles}
        selectedDate={selectedDate}
        onclickSelecteDate={onclickSelecteDate}
      />
    );
  }


  if (startDatetime !== 1) {
    if (calendarDay < currentDate) {
      return <DisableDay date={calendarDay} calendarStyles={calendarStyles} />;
    }
  }


  if (endDatetime !== 1) {
    if (calendarDay > endDatetime) {
      return <DisableDay date={calendarDay} calendarStyles={calendarStyles} />;
    }
  }

  return (
    <AvailableDay
      date={calendarDay}
      calendarStyles={calendarStyles}
      selectedDate={selectedDate}
      onclickSelecteDate={onclickSelecteDate}
    />
  );
};

export default function DatePicker({
  selectedDate,
  selectedMonth,
  startDatetime,
  endDatetime,
  calendarStyles,
  calendarMonthlyArray,
  calendarToggle,
  timeZone,
  handleToggleForward,
  handleTogglePrevious,
  onclickSelecteDate,
  disableWeeklyArray,
  disableSpecificArray,
  disableDate,
  isTimeslot
}: DatepickerProps) {
  const currentDate = getCurrentDate(timeZone);

  return (
    <div className={isTimeslot ? `${stylesMap[calendarStyles]['calendar-wrapper-timeslot']}` : `${stylesMap[calendarStyles]['calendar-wrapper']}`}>
      <div className="calendar-container">
        <div className={`${stylesMap[calendarStyles]['calendar-header']} `}>
          <div className="font-bold">{monthStr[selectedMonth.month]}</div>
          <div className="calendar-toggle">
            <div>
              <button
                className={
                  calendarToggle.previousPeriod
                    ? 'calendar-left-toggle'
                    : 'calendar-left-toggle-disable'
                }
                onClick={() => handleTogglePrevious()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

            </div>
            <div>
              <button
                onClick={() => handleToggleForward()}
                className={
                  calendarToggle.nextPeriod
                    ? 'calendar-right-toggle'
                    : 'calendar-right-toggle-disable'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
        </div>
        <div className={`${stylesMap[calendarStyles]['calendar-content']}`}>
          {weeklyStr.map((item) => {
            return (
              <div
                className={`${stylesMap[calendarStyles]['calendar-weekly']}`}
              >
                {item}
              </div>
            );
          })}
          {calendarMonthlyArray &&
            calendarMonthlyArray.map((calendarDay: Date | string) => {
              return (
                <CalendarmMap
                  currentDate={currentDate}
                  calendarDay={calendarDay}
                  startDatetime={startDatetime}
                  endDatetime={endDatetime}
                  selectedDate={selectedDate}
                  disableWeeklyArray={disableWeeklyArray}
                  disableSpecificArray={disableSpecificArray}
                  disableDate={disableDate}
                  onclickSelecteDate={onclickSelecteDate}
                  calendarStyles={calendarStyles}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
