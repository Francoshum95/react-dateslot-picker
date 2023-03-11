import { describe, expect, test, afterEach, it } from 'vitest'
import {   
  render,
  screen,
  fireEvent,
  act,
  renderHook,} from '@testing-library/react';

import { DateSlotPickContext } from "../context/DateSlotPickContext";
import useDatePicker from "../hook/useDatePicker";
import { FORWARD, PREVIOUS } from "../constant";
import { useContext } from 'react';
  
const defaultMockMonth = 10;

describe("Datepicker", () => {
  const currentDate = new Date();

  const MockComponent = () => {
    const {currentDatetime, startDatetime, endDatetime} = useContext(DateSlotPickContext);
  }

  it("should correctly change calendarPeriod forward", () => {
    const currentDatetime = currentDate.setMonth(defaultMockMonth);

    const wrapper = () => (
      <DateSlotPickContext currentDate={currentDatetime}>
        <div>testing</div>
      </DateSlotPickContext>
    );


    const { result } = renderHook(() => useDatePicker(), { wrapper });


    act(() => {
      result.current.onChangeCalendarPeriod(FORWARD);
    });

    expect(result.current.calendarPeriod.month).toBe(11);
  });
});


