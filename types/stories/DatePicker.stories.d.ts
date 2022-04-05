/// <reference types="react" />
declare const _default: {
    compoent: ({ isTimeslot, duration, startDate, endDate, dailyTimePair, disableWeekly, disableSpecific, disableTimeslot, disableDate, timeZone, onClickCalendar, onClickTimeslot, styles }: {
        isTimeslot?: boolean | undefined;
        duration?: number | undefined;
        startDate?: number | undefined;
        endDate?: number | undefined;
        dailyTimePair?: {
            startTime: number[];
            endTime: number[];
        }[] | undefined;
        disableWeekly?: never[] | undefined;
        disableSpecific?: never[] | undefined;
        disableTimeslot?: never[] | undefined;
        disableDate?: never[] | undefined;
        timeZone?: string | undefined;
        onClickCalendar?: (() => void) | undefined;
        onClickTimeslot?: (() => void) | undefined;
        styles?: string | undefined;
    }) => JSX.Element;
    title: string;
};
export default _default;
export declare const Default: (args: any) => JSX.Element;
