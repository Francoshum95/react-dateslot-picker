import { getDatetime, getCurrentDate } from './Utilities';
import {
  datetimeParseProps,
  getAvailableDayProps,
  getCalendarTypeProps,
} from '../type/datetimeparse.type';
import {
  CALENDARALL,
  CALENDARLAST,
  CALENDARBEGIN,
  CALENDARNORMAL,
  CALENDARFIX,
} from '../constant';

const getDay = (array: string[] | number[] | []) => {
  let dateArray: number[] = [];

  if (array.length === 0) {
    return dateArray;
  }

  array.forEach((date) => {
    if (typeof date === 'string') {
      const splitDate = date.split('-');

      const startIndex = parseInt(splitDate[0], 10);
      const endIndex = parseInt(splitDate[1], 10);

      if (isNaN(endIndex)) {
        dateArray.push(startIndex);
      } else {
        for (let i = startIndex; endIndex >= i; i++) {
          dateArray.push(i);
        }
      }
    } else {
      dateArray.push(date);
    }
  });

  return dateArray;
};

const getAvailableDay = ({
  disableSpecific,
  disableWeekly,
}: getAvailableDayProps) => {
  return {
    disableWeeklyArray: getDay(disableWeekly),
    disableSpecificArray: getDay(disableSpecific),
  };
};

const getCalendarType = ({
  startDatetime,
  endDatetime,
  currentDatetime,
}: getCalendarTypeProps) => {
  if (startDatetime === 1 && endDatetime === 1) {
    return CALENDARALL;
  } else if (endDatetime === 1) {
    return CALENDARLAST;
  } else if (startDatetime === 1) {
    return CALENDARBEGIN;
  } else if (
    typeof startDatetime !== 'number' &&
    typeof endDatetime !== 'number'
  ) {
    if (
      currentDatetime.getMonth() === endDatetime.getMonth() &&
      currentDatetime.getFullYear() === endDatetime.getFullYear()
    ) {
      return CALENDARFIX;
    }
  }
  return CALENDARNORMAL;
};

export default function datetimeParse({
  startDate,
  endDate,
  disableWeekly,
  disableSpecific,
  timeZone,
}: datetimeParseProps) {
  try {
    const startDatetime = getDatetime(startDate, timeZone);
    const endDatetime = getDatetime(endDate, timeZone);
    const currentDatetime = getCurrentDate(timeZone);
    const calendarType = getCalendarType({
      startDatetime,
      endDatetime,
      currentDatetime,
    });
    const { disableWeeklyArray, disableSpecificArray } = getAvailableDay({
      disableWeekly,
      disableSpecific,
    });

    return {
      startDatetime,
      endDatetime,
      calendarType,
      disableWeeklyArray,
      disableSpecificArray,
      isError: false,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      startDatetime: 1,
      endDatetime: 1,
      calendarType: CALENDARALL,
      disableWeeklyArray: [],
      disableSpecificArray: [],
      isError: true,
    };
  }
}
