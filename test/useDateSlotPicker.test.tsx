import { renderHook } from '@testing-library/react-hooks';
import useDateSlotPicker from '../src/useDateSlotPicker';


const tesingCase_1 = {
  isTimeslot: true,
  duration: 30,
  dailyTimePair: [{
    startTime: [0, 0],
    endTime: [11, 59]
  }],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  styles: 'dark',
  startDatetime: 1,
  endDatetime: 1,
  calendarType: 'CALENDARALL',
  onClickCalendar: () => {},
  onClickTimeslot: () => {}
}




describe("useDateSlotPicker", () => {
  it("componentDidMount", () => {
    const result = renderHook(() => useDateSlotPicker(tesingCase_1));
    console.debug("result", result)
  })
})