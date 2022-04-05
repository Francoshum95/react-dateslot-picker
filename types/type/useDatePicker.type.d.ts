/// <reference types="react" />
export interface useDatePickerProps {
    isTimeslot: boolean;
    duration: number;
    dailyTimePair: {
        startTime: number[];
        endTime: number[];
    }[];
    timeZone: string;
    styles: string;
    startDatetime: Date | number;
    endDatetime: Date | number;
    calendarType: string;
    onClickCalendar: React.Dispatch<React.SetStateAction<Date>>;
    onClickTimeslot: React.Dispatch<React.SetStateAction<number>>;
}
export interface selectedMonthDateProps {
    year: number;
    month: number;
}
export interface getTimeslotProps {
    isTimeslot: boolean;
    dailyTimePair: {
        startTime: number[];
        endTime: number[];
    }[];
    duration: number;
    timeZone: string;
    selectedDate: Date | null;
}
export interface getTimeProps {
    timeslot: Date[];
    startDatetime: Date;
    endDatetime: Date;
    duration: number;
    timeZone: string;
    currentDate: Date;
    index: number;
    indexDate: number;
}
