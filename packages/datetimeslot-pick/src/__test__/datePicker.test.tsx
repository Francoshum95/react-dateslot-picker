import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';

import { DateSlotPickContext } from '../components/context/DateSlotPickContext';
import useDatePicker from '../components/hook/useDatePicker';
import { FORWARD, PREVIOUS } from '../components/constant';
import type { ReactNode } from 'react';

const defaultMockYaer = 2023;
const defaultMockMonth = 10;
const defaultMockResult = [
  1698796800, 1698883200, 1698969600,
  1699056000, 1699142400, 1699228800,
  1699315200, 1699401600, 1699488000,
  1699574400, 1699660800, 1699747200,
  1699833600, 1699920000, 1700006400,
  1700092800, 1700179200, 1700265600,
  1700352000, 1700438400, 1700524800,
  1700611200, 1700697600, 1700784000,
  1700870400, 1700956800, 1701043200,
  1701129600, 1701216000, 1701302400
]
const nextPeriodMockResult = [
  1701388800, 1701475200, 1701561600,
  1701648000, 1701734400, 1701820800,
  1701907200, 1701993600, 1702080000,
  1702166400, 1702252800, 1702339200,
  1702425600, 1702512000, 1702598400,
  1702684800, 1702771200, 1702857600,
  1702944000, 1703030400, 1703116800,
  1703203200, 1703289600, 1703376000,
  1703462400, 1703548800, 1703635200,
  1703721600, 1703808000, 1703894400,
  1703980800
]

const getMockCalenarArray = (array: number[]) => {
  const calendarArray = [] as (Date | string)[];

  array.forEach((timeStamp) => {
    calendarArray.push(new Date(timeStamp * 1000))
  });

  const firstElement = calendarArray[0];
  const lastElement = calendarArray[calendarArray.length - 1];

  if (firstElement instanceof Date && lastElement instanceof Date) {
    const startDate = firstElement.getDay();
    const endDate = lastElement.getDay();

    if (startDate !== 0) {
      for (let numString = 0; startDate > numString; numString++) {
        calendarArray.unshift('');
      }
    }

    if (endDate !== 6) {
      for (let numString = 0; 6 - endDate > numString; numString++) {
        calendarArray.push('');
      }
    }
  }

  return calendarArray;
};

describe('Datepicker', () => {
  describe('onChange Calendar Period', () => {
    const currentDate = new Date();

    it('should change calendarPeriod forward', () => {
      const currentDatetime = currentDate.setMonth(defaultMockMonth);

      const wrapper = ({ children }: { children: ReactNode }) => (
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

    it('should change calendarPeriod backword', () => {
      const currentDatetime = currentDate.setMonth(defaultMockMonth);

      const wrapper = ({ children }: { children: ReactNode }) => (
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

    it('should change calendarPeriod forward to next year', () => {
      const currentDatetime = currentDate.setMonth(defaultMockMonth + 1);

      const wrapper = ({ children }: { children: ReactNode }) => (
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

    it('should change calendarPeriod forward to previous year', () => {
      const currentDatetime = currentDate.setMonth(0);

      const wrapper = ({ children }: { children: ReactNode }) => (
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

  describe('initial calendar', () => {
    const currentDate = new Date();

    it('should match', async () => {
      const currentDatetime = currentDate.setMonth(defaultMockMonth);

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext currentDate={currentDatetime}>
          {children}
        </DateSlotPickContext>
      );

      const { result, rerender } = renderHook(() => useDatePicker(), {
        wrapper,
      });

      const mockResult = getMockCalenarArray(defaultMockResult);

      expect(result.current.calendarArray).toEqual(mockResult);
    });

    it ('it should match - switch month', () => {
      const currentDatetime = currentDate.setMonth(defaultMockMonth);

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext currentDate={currentDatetime}>
          {children}
        </DateSlotPickContext>
      );

      const { result, rerender } = renderHook(() => useDatePicker(), {
        wrapper,
      });

      act(() => {
        result.current.onChangeCalendarPeriod(FORWARD);
      });

      rerender();

      const mockResult = getMockCalenarArray(nextPeriodMockResult);

      expect(result.current.calendarArray).toEqual(mockResult);
    });


  });
});