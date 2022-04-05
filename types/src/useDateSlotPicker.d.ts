import { useDatePickerProps, selectedMonthDateProps } from './type/useDatePicker.type';
export default function useDateSlotPicker({ isTimeslot, duration, dailyTimePair, timeZone, styles, startDatetime, endDatetime, calendarType, onClickCalendar, onClickTimeslot }: useDatePickerProps): {
    selectedDate: Date | null;
    selectedMonth: selectedMonthDateProps;
    calendarMonthlyArray: (string | Date)[];
    timeslotArray: Date[];
    calendarStyles: string;
    calendarToggle: {
        previousPeriod: boolean;
        nextPeriod: boolean;
    };
    handleToggleForward: () => void;
    handleTogglePrevious: () => void;
    onclickSelecteDate: (selected: Date) => void;
    selectedTimeslot: Date | null;
    onClickSelectedTimeslot: (selected: Date, timeStamp: number) => void;
};
