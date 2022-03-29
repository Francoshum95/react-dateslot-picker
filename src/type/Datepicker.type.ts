export interface DatepickerProps{
  selectedDate: Date | null,
  selectedMonth: {month: number, year: number},
  startDatetime: Date | number,
  endDatetime: Date | number,
  calendarStyles: string,
  calendarMonthlyArray: (string | Date)[],
  calendarToggle: {previousPeriod: boolean, nextPeriod: boolean},
  timeZone: string,
  handleToggleForward: () => void, 
  handleTogglePrevious:() => void, 
  onclickSelecteDate: (date: Date) => void, 
  disableWeeklyArray: number[] | [],
  disableSpecificArray: number[] | [],
  disableDate: number [],
  iSError: boolean,
  styles: string,
  isTimeslot: boolean
}

export interface CalendarMapProps{
  currentDate: Date ,
  calendarDay: Date | string,
  startDatetime: Date | number,
  endDatetime: Date | number,
  calendarStyles: string,
  selectedDate: Date | null,
  disableWeeklyArray: number[] 
  disableSpecificArray: number[],
  disableDate: number [],
  onclickSelecteDate: (date: Date) => void,
}

export interface AvailableDayProps{
  date: Date,
  calendarStyles: string,
  selectedDate: Date | null,
  onclickSelecteDate: (date: Date) => void,
}


export interface DisableDayProps{
  date: Date,
  calendarStyles: string,
}