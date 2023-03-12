import { describe, expect, it } from 'vitest'
import {   
  act,
  renderHook,} from '@testing-library/react';

import { DateSlotPickContext } from "../components/context/DateSlotPickContext";
import useDatePicker from "../components/hook/useDatePicker";
import { FORWARD, PREVIOUS } from "../components/constant";
import type {ReactNode} from 'react';
  

const defaultMockYaer = 2023;
const defaultMockMonth = 10;

describe("Datepicker", () => {
  const currentDate = new Date();

  it("should change calendarPeriod forward", () => {
    const currentDatetime = currentDate.setMonth(defaultMockMonth);

    const wrapper = ({children}: {children: ReactNode}) => (
      <DateSlotPickContext currentDate={currentDatetime}>
        {children}
      </DateSlotPickContext>
    );

    const { result } = renderHook(() => useDatePicker(), { wrapper });


    act(() => {
      result.current.onChangeCalendarPeriod(FORWARD);
    });

    expect(result.current.calendarPeriod.month).toBe(11);
    expect(result.current.calendarPeriod.year).toBe(defaultMockYaer);

  });

  it("should change calendarPeriod backword", () => {
    const currentDatetime = currentDate.setMonth(defaultMockMonth);

    const wrapper = ({children}: {children: ReactNode}) => (
      <DateSlotPickContext currentDate={currentDatetime}>
        {children}
      </DateSlotPickContext>
    );

    const { result } = renderHook(() => useDatePicker(), { wrapper });


    act(() => {
      result.current.onChangeCalendarPeriod(PREVIOUS);
    });

    expect(result.current.calendarPeriod.month).toBe(9);
    expect(result.current.calendarPeriod.year).toBe(defaultMockYaer);

  });

  it("should change calendarPeriod forward to next year", () => {
    const currentDatetime = currentDate.setMonth(defaultMockMonth + 1);

    const wrapper = ({children}: {children: ReactNode}) => (
      <DateSlotPickContext currentDate={currentDatetime}>
        {children}
      </DateSlotPickContext>
    );

    const { result } = renderHook(() => useDatePicker(), { wrapper });

    act(() => {
      result.current.onChangeCalendarPeriod(FORWARD);
    });

    expect(result.current.calendarPeriod.month).toBe(0);
    expect(result.current.calendarPeriod.year).toBe(defaultMockYaer + 1);
  });

  it("should change calendarPeriod forward to previous year", () => {
    const currentDatetime = currentDate.setMonth(0);

    const wrapper = ({children}: {children: ReactNode}) => (
      <DateSlotPickContext currentDate={currentDatetime}>
        {children}
      </DateSlotPickContext>
    );

    const { result } = renderHook(() => useDatePicker(), { wrapper });

    act(() => {
      result.current.onChangeCalendarPeriod(PREVIOUS);
    });

    expect(result.current.calendarPeriod.month).toBe(11);
    expect(result.current.calendarPeriod.year).toBe(defaultMockYaer - 1);
  });

  



});


