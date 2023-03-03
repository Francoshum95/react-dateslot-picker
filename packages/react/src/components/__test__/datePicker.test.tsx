import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
} from "@testing-library/react";

import { DateSlotPickContext } from "../context/DateSlotPickContext";
import useDatePicker from "../hooks/useDatePicker";
import { FORWARD, PREVIOUS } from "../constant";

const defaultMockMonth = 10;

describe("Datepicker", () => {
  const currentDate = new Date();

  it("should correctly change calendarPeriod forward", () => {
    const currentDatetime = currentDate.setMonth(defaultMockMonth);

    const wrapper = (children) => (
      <DateSlotPickContext currentDate={currentDatetime}>
        {children}
      </DateSlotPickContext>
    );

    const { result } = renderHook(() => useDatePicker(), { wrapper });

    act(() => {
      result.current.onChangeCalendarPeriod(FORWARD);
    });

    expect(result.current.calendarPeriod.month).toBe(11);
  });
});
