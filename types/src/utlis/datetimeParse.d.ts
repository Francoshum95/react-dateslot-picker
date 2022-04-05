import { datetimeParseProps } from '../type/datetimeparse.type';
export default function datetimeParse({ startDate, endDate, disableWeekly, disableSpecific, timeZone, }: datetimeParseProps): {
    startDatetime: number | Date;
    endDatetime: number | Date;
    calendarType: string;
    disableWeeklyArray: number[];
    disableSpecificArray: number[];
    isError: boolean;
};
