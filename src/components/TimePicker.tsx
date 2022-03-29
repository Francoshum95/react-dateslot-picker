import React from 'react';
import { TimePickerProps, TimeslotmMapProps, DisableTimeProps, AvailableTimeProps, isNotAvailableProps } from '../type/TimePicker.type';
import { getCurrentDate, getTimeslotString, isToday } from '../utlis/Utilities';
import { stylesMap } from '../constant';

const AvailableTime = ({calendarStyles, selectedTimeslot, time, timestamp, onClickSelectedTimeslot}: AvailableTimeProps) => {

  return (
    <div
      onClick={() => {onClickSelectedTimeslot(time, timestamp)}}
      className={selectedTimeslot===time ? `${stylesMap[calendarStyles]['timeslot-item-selected']}` : `${stylesMap[calendarStyles]['timeslot-item-available']}`}
    >
      {getTimeslotString(time)}
    </div>
  )
}

const DisableTime = ({calendarStyles, time}: DisableTimeProps) => {
  return (
    <div
      className={`${stylesMap[calendarStyles]['timeslot-item-disable']}`}
    >
      {getTimeslotString(time)}
    </div>
  )
}

const TimeslotmMap = ({
  time,
  currentDate,
  selectedTimeslot,
  calendarStyles,
  disableTimeslot,
  onClickSelectedTimeslot,
}:TimeslotmMapProps) => {

  const timestamp = time.valueOf() /1000;
  
  if (disableTimeslot.includes(timestamp)){
    return <DisableTime
              calendarStyles={calendarStyles}
              time={time}
            />
  }

  if (currentDate > time){
    return <DisableTime
              calendarStyles={calendarStyles}
              time={time}
            />
  }

  return <AvailableTime
            calendarStyles={calendarStyles}
            selectedTimeslot={selectedTimeslot}
            time={time}
            timestamp={timestamp}
            onClickSelectedTimeslot={onClickSelectedTimeslot}
          />
}

const isNotAvailable = ({currentDate, selectedDate, timeslotArray}:isNotAvailableProps) => {
  if (timeslotArray.length > 0 && selectedDate){
    if (isToday(currentDate, selectedDate)){
      if (currentDate < timeslotArray[timeslotArray.length -1]){
        return true
      }
    }
    if (currentDate < selectedDate){
      return true
    }
  }
  return false

}

export default function TimePicker({
  timeslotArray,
  calendarStyles,
  disableTimeslot,
  timeZone,
  onClickSelectedTimeslot,
  isTimeslot,
  selectedDate,
  selectedTimeslot
}: TimePickerProps) {

  const currentDate = getCurrentDate(timeZone);

  return (
    <>
      {
        isTimeslot && 
        <div className={`${stylesMap[calendarStyles]['timeslot-wrapper']}`}>
          {
            isNotAvailable({currentDate, selectedDate, timeslotArray}) ? (
              <div className='timeslot-container'>
                {
                  timeslotArray && 
                  timeslotArray.map((time: Date) => {
                    return (
                      <TimeslotmMap
                        time={time}
                        selectedTimeslot={selectedTimeslot}
                        currentDate={currentDate}
                        calendarStyles={calendarStyles}
                        disableTimeslot={disableTimeslot}
                        timeZone={timeZone}
                        onClickSelectedTimeslot={onClickSelectedTimeslot}
                      />
                    )
                  })
                }
              </div>
            ) : (
              <div className='timeslot-not-available-container'>
                <svg xmlns="http://www.w3.org/2000/svg" className={`${stylesMap[calendarStyles]['timeslot-not-available-icon']}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className={`${stylesMap[calendarStyles]['timeslot-not-available']}`}>No appointments available</span>
              </div>
            )
          }
        </div>
      }
    </>
  )
}
