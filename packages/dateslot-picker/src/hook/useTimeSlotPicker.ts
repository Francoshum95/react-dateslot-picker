import { useContext, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { IsDateSlotPicker } from '../components';
import {
  DateSlotPickCtx,
  selectedDateType,
  selectedTimezoneType,
} from '../context/DateSlotPickContext';
import { defaultDuraiton } from '../components/constant';

type getTimeslotType = IsDateSlotPicker & {
  endDatetime: DateTime;
  timezone: selectedTimezoneType;
  selectedDate: selectedDateType;
};

export type selectedTimeslotType = DateTime | null;
export type onChangeSelectedDateslotType = (timeslot: DateTime) => void;


const getTimeslot = ({
  endDatetime,
  selectedDate,
  dailyTimePair,
  duration,
  timezone,
}: getTimeslotType) => {
  const timeslot: DateTime[] = [];

  if (selectedDate && duration) {
    const { year, month, day } = selectedDate;
    
    dailyTimePair?.forEach((time) => {
      const startDate = DateTime.fromObject({
        year,
        month,
        day,
        hour: time.startTime[0],
        minute: time.startTime[1],
      }).setZone(timezone);
      const endDate = DateTime.fromObject({
        year,
        month,
        day,
        hour: time.endTime[0],
        minute: time.endTime[1],
      }).setZone(timezone);

      let currentDateTime = startDate;

      while (currentDateTime.toMillis() < endDate.toMillis()
      ) {

        if (endDatetime.toMillis() > currentDateTime.toMillis()){
          timeslot.push(currentDateTime);
        };

        currentDateTime = DateTime.fromMillis(
          currentDateTime.toMillis() + duration * 60000
        );
      }
    });
  }

  return timeslot;
};

const useTimeSlotPicker = (props: IsDateSlotPicker) => {
  const { selectedDate, timezone, endDatetime } = useContext(DateSlotPickCtx);

  const dailyTimePair = props.dailyTimePair ||  [{
    startTime: [0, 0],
    endTime: [23, 59]
  }]
  const disableDate = props.disableDate || []; 
  const duration = props.duration || defaultDuraiton;

  const [selectedTimeslot, setSelectedTimeslot] =
    useState<selectedTimeslotType>(null);

  const timeslots = useMemo(
    () => getTimeslot({ endDatetime, disableDate, selectedDate, dailyTimePair, duration, timezone }),
    [endDatetime, selectedDate]
  );

  const onChangeSelectedDateslot = (timeslot: DateTime) => {
    setSelectedTimeslot(timeslot);
    if (props.onSelectDatetime){
      const selectedDatetime = DateTime.fromObject({
        year: selectedDate?.year,
        month: selectedDate?.month,
        day: selectedDate?.day,
        hour: timeslot.hour,
        minute: timeslot.minute
      }).setZone(timezone)
      props.onSelectDatetime(selectedDatetime.toMillis())
    }
  };

  return {
    selectedTimeslot,
    timeslots,
    onChangeSelectedDateslot,
  };
};

export default useTimeSlotPicker;
