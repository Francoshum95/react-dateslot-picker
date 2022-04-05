/// <reference types="react" />
export interface DateSlotPickerProps {
    isTimeslot: boolean;
    duration: number;
    startDate: string | number;
    endDate: string | number;
    dailyTimePair: {
        startTime: number[];
        endTime: number[];
    }[];
    disableWeekly: string[] | number[] | [];
    disableSpecific: string[] | number[] | [];
    disableTimeslot: number[] | [];
    disableDate: number[] | [];
    timeZone: string;
    onClickCalendar: () => void | React.Dispatch<React.SetStateAction<Date>>;
    onClickTimeslot: () => void | React.Dispatch<React.SetStateAction<number>>;
    styles: string;
}
