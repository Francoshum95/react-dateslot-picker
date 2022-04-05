import { checkStartPeriodProps, checkEndPeriodProps } from "../type/Utilities.type";
export declare function getDatetime(timeStamp: string | number, timeZone: string): 1 | Date;
export declare function getCurrentDate(timeZone: string): Date;
export declare function checkIfEndPeriod({ selectedMonth, endDatetime }: checkEndPeriodProps): boolean;
export declare function checkIfStartPeriod({ selectedMonth, startDatetime }: checkStartPeriodProps): boolean;
export declare function getCalendarArray(year: number, month: number, timeZone: string): (string | Date)[];
export declare function isToday(currentDate: Date, selectedDate: Date): boolean;
export declare function getTimeslotString(time: Date): string;
