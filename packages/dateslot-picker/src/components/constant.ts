export const FORWARD = "forward" as const;
export const PREVIOUS = "previous" as const;
export const START = 'start' as const;
export const END = 'end' as const;
export const FIRST_MONTH = 1;
export const LAST_MONTH = 12;
export const defaultDuraiton = 30;
export const monthStr: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};