export interface datetimeParseProps{
  startDate: string | number,
  endDate: string | number,
  disableWeekly : string[] | number [] | [],
  disableSpecific: string[] | number [] | [],
  timeZone: string,
}

export interface getAvailableDayProps{
  disableWeekly : string[] | number [] | [],
  disableSpecific: string[] | number [] | [],
}


export interface getCalendarTypeProps{
  startDatetime: Date | number,
  endDatetime: Date | number,
  currentDatetime: Date
}

