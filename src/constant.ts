export const CALENDARALL = 'CALENDARALL';
export const CALENDARLAST = 'CALENDARLAST';
export const CALENDARBEGIN = 'CALENDARBEGIN';
export const CALENDARNORMAL = 'CALENDARNORMAL';
export const CALENDARFIX = 'CALENDARFIX'

interface calendarTypeMapType {
  [key: string]: {
    previousPeriod: boolean,
    nextPeriod: boolean
  }
}

export const calendarTypeMap:calendarTypeMapType = {
  "CALENDARALL": {
    previousPeriod: true,
    nextPeriod: true,
  }, 
  "CALENDARLAST": {
    previousPeriod: false,
    nextPeriod: true,
  },
  "CALENDARFIX": {
    previousPeriod: false,
    nextPeriod: false,
  },
  "CALENDARBEGIN": {
    previousPeriod: true,
    nextPeriod: false,
  },
  "CALENDARNORMAL": {
    previousPeriod: false,
    nextPeriod: true,
  },
}

export const weeklyStr = ["S", "M", "T", "W", "T", "F", "S"];
export const monthStr : Record<number, string>= {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};
export const stylesArray = ['dark', 'light']

interface styles{
  'calendar-wrapper': string,
  'calendar-wrapper-timeslot': string,
  'calendar-header': string,
  'calendar-content': string,
  'calendar-weekly': string,
  'calendar-disable-day':string,
  'calendar-available-day': string,
  'calendar-selected-day': string,
  'calendar-current-available-day': string,
  'calendar-current-day': string,
  'timeslot-wrapper': string,
  'timeslot-item-available': string,
  'timeslot-item-disable': string,
  'timeslot-item-selected': string,
  'timeslot-not-available': string,
  'timeslot-not-available-icon': string
}

export const stylesMap : Record<string, styles>= {
  'dark':{
    'calendar-wrapper': 'w-[18rem] h-[18rem] bg-[#1e1c22] rounded-2xl select-none',
    'calendar-wrapper-timeslot': 'w-[18rem] h-[17rem] md:h-[18rem] bg-[#1e1c22] rounded-tl-2xl rounded-tr-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none select-none',
    'calendar-header': 'text-red-500 w-[80%] flex justify-between mx-auto px-1',
    'calendar-content': 'grid grid-cols-7 text-xs w-[80%] mx-auto',
    'calendar-weekly': 'w-7 h-7 text-gray-500 flex items-center justify-center',
    'calendar-disable-day': 'w-8 h-8 text-gray-500 flex items-center justify-center',
    'calendar-available-day': 'w-8 h-8 text-white flex items-center justify-center cursor-pointer',
    'calendar-selected-day': 'rounded-full bg-red-400 w-8 h-8 text-white flex items-center justify-center',
    'calendar-current-available-day': 'w-8 h-8 text-green-500 flex items-center justify-center cursor-pointer',
    'calendar-current-day': 'w-8 h-8 text-green-500 flex items-center justify-center',

    'timeslot-wrapper': 'h-[16rem] md:h-[18rem] w-[18rem] md:w-[15rem] bg-[#1e1c22] md:py-[2.5rem] rounded-bl-2xl rounded-br-2xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none select-none text-white text-sm',
    'timeslot-item-available': 'bg-[#333] flex justify-center items-center text-blue-500 rounded-md p-[.7rem] font-bold cursor-pointer',
    'timeslot-item-disable': 'bg-[#2b2b2b96] flex justify-center items-center text-blue-500 rounded-md p-[.7rem] font-bold',
    'timeslot-item-selected': 'bg-[#1e1c22] flex justify-center items-center text-blue-500 rounded-md p-[.7rem] font-bold',
    'timeslot-not-available': 'text-white',
    'timeslot-not-available-icon': 'h-5 w-5 mr-3 text-white'
  },
  'light': {
    'calendar-wrapper': 'w-[18rem] h-[18rem] bg-white rounded-2xl select-none',
    'calendar-wrapper-timeslot': 'w-[18rem] h-[17rem] md:h-[18rem] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none select-none',
    'calendar-header': 'text-red-500 w-[80%] flex justify-between mx-auto px-1',
    'calendar-content': 'grid grid-cols-7 text-xs w-[80%] mx-auto',
    'calendar-weekly': 'w-7 h-7 text-gray-500 flex items-center justify-center',
    'calendar-disable-day': 'w-8 h-8 text-gray-500 flex items-center justify-center',
    'calendar-available-day': 'w-8 h-8 text-black flex items-center justify-center cursor-pointer',
    'calendar-selected-day': 'rounded-full bg-red-400 w-8 h-8 text-black flex items-center justify-center',
    'calendar-current-available-day': 'w-8 h-8 text-green-500 flex items-center justify-center cursor-pointer',
    'calendar-current-day': 'w-8 h-8 text-green-500 flex items-center justify-center',
    
    'timeslot-wrapper': 'h-[16rem] md:h-[18rem] w-[18rem] md:w-[15rem] bg-white md:py-[2.5rem] rounded-tr-2xl rounded-br-2xl select-none text-white text-sm',
    'timeslot-item-available': 'bg-[#ececec] flex justify-center items-center text-black rounded-md p-[.7rem] font-bold cursor-pointer',
    'timeslot-item-disable': 'bg-[#ececec] flex justify-center items-center text-black rounded-md p-[.7rem] bg-opacity-50 font-bold',
    'timeslot-item-selected': 'bg-white  flex justify-center items-center text-blue-500 rounded-md p-[.7rem] font-bold',
    'timeslot-not-available': 'text-black',
    'timeslot-not-available-icon': 'h-5 w-5 mr-3 text-black'
  }
}