export interface TimePickerProps {
    timeslotArray: Date[] | [];
    calendarStyles: string;
    disableTimeslot: number[] | [];
    timeZone: string;
    onClickSelectedTimeslot: (seleced: Date, timestamp: number) => void;
    isTimeslot: boolean;
    selectedDate: Date | null;
    selectedTimeslot: Date | null;
}
export interface TimeslotmMapProps {
    time: Date;
    selectedTimeslot: Date | null;
    currentDate: Date;
    calendarStyles: string;
    disableTimeslot: number[];
    timeZone: string;
    onClickSelectedTimeslot: (seleced: Date, timestamp: number) => void;
}
export interface DisableTimeProps {
    calendarStyles: string;
    time: Date;
}
export interface AvailableTimeProps {
    calendarStyles: string;
    selectedTimeslot: Date | null;
    time: Date;
    timestamp: number;
    onClickSelectedTimeslot: (seleced: Date, timestamp: number) => void;
}
export interface isNotAvailableProps {
    currentDate: Date;
    selectedDate: Date | null;
    timeslotArray: Date[] | [];
}
