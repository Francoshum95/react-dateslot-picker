export declare const CALENDARALL = "CALENDARALL";
export declare const CALENDARLAST = "CALENDARLAST";
export declare const CALENDARBEGIN = "CALENDARBEGIN";
export declare const CALENDARNORMAL = "CALENDARNORMAL";
export declare const CALENDARFIX = "CALENDARFIX";
export declare const weeklyStr: string[];
export declare const monthStr: Record<number, string>;
export declare const stylesArray: string[];
interface styles {
    'calendar-wrapper': string;
    'calendar-wrapper-timeslot': string;
    'calendar-header': string;
    'calendar-content': string;
    'calendar-weekly': string;
    'calendar-disable-day': string;
    'calendar-available-day': string;
    'calendar-selected-day': string;
    'calendar-current-available-day': string;
    'calendar-current-day': string;
    'timeslot-wrapper': string;
    'timeslot-item-available': string;
    'timeslot-item-disable': string;
    'timeslot-item-selected': string;
    'timeslot-not-available': string;
    'timeslot-not-available-icon': string;
}
export declare const stylesMap: Record<string, styles>;
export {};
