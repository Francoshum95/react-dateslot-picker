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
  timezone: selectedTimezoneType;
  selectedDate: selectedDateType;
};

export type selectedTimeslotType = DateTime | null;
export type onChangeSelectedDateslotType = (timeslot: DateTime) => void;

const getEndDatetime = (timeStamp: number | undefined, timezone: string) => {
  if (timeStamp) {
    return DateTime.fromMillis(timeStamp).setZone(timezone);
  };

  const currentDatetime = DateTime.now().setZone(timezone);
  const currentYaer = currentDatetime.year;

  return DateTime.fromObject({
    year: currentYaer + 100, month: 1
  }).setZone(timezone);

};

const getTimeslot = ({
  endDate,
  selectedDate,
  dailyTimePair,
  duration,
  timezone,
}: getTimeslotType) => {
  const timeslot: DateTime[] = [];

  if (selectedDate && duration) {
    const { year, month, day } = selectedDate;
    const endPeropdDatetime = getEndDatetime(endDate, timezone);
    
    dailyTimePair?.forEach((time) => {
      const startDatetime = DateTime.fromObject({
        year,
        month,
        day,
        hour: time.startTime[0],
        minute: time.startTime[1],
      }).setZone(timezone);
      const endDatetime = DateTime.fromObject({
        year,
        month,
        day,
        hour: time.endTime[0],
        minute: time.endTime[1],
      }).setZone(timezone);

      let currentDateTime = startDatetime;

      while (currentDateTime.toMillis() < endDatetime.toMillis()
      ) {

        if (endPeropdDatetime.toMillis() > currentDateTime.toMillis()){
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
  const { selectedDate, timezone } = useContext(DateSlotPickCtx);

  const dailyTimePair = props.dailyTimePair ||  [{
    startTime: [0, 0],
    endTime: [23, 59]
  }]
  const disableDate = props.disableDate || []; 
  const duration = props.duration || defaultDuraiton;

  const [selectedTimeslot, setSelectedTimeslot] =
    useState<selectedTimeslotType>(null);

  const timeslots = useMemo(
    () => getTimeslot({ endDate: props.endDate, disableDate, selectedDate, dailyTimePair, duration, timezone }),
    [timezone, selectedDate]
  );

  const onChangeSelectedDateslot = (timeslot: DateTime) => {
    setSelectedTimeslot(timeslot);
  };

  return {
    selectedTimeslot,
    timeslots,
    onChangeSelectedDateslot,
  };
};

export default useTimeSlotPicker;
