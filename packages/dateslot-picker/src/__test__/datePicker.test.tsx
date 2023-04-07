import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { DateTime } from 'luxon';

import { DateSlotPickContext } from '../context/DateSlotPickContext';
import useDatePicker from '../hook/useDatePicker';
import { defaultTimezone } from '../utils/common';
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
  const calendarArray = [] as (DateTime | string)[];

  array.forEach((timeStamp) => {
    calendarArray.push(DateTime.fromMillis(timeStamp * 1000).setZone(defaultTimezone))
  });

  const firstElement = calendarArray[0];
  const lastElement = calendarArray[calendarArray.length - 1];

  if (firstElement instanceof DateTime && lastElement instanceof DateTime) {
    const startDate = firstElement.weekday;
    const endDate = lastElement.weekday;

    if (startDate !== 2) {
      for (let numString = 0; startDate > numString; numString++) {
        calendarArray.unshift('');
      }
    }

    if (endDate !== 7) {
      for (let numString = 0; 7 - endDate > numString; numString++) {
        calendarArray.push('');
      }
    }
  }

  return calendarArray;
};

describe('Datepicker', () => {
  describe('onChange Calendar Period', () => {
    const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth}).setZone(defaultTimezone)
    const mockStartMonth = defaultMockMonth;
    const mockEnDate = 11;

    it('should change calendarPeriod forward', () => {
      const currentDate = mockDate.toMillis()

      const mockStartTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockStartMonth
      }).setZone(defaultTimezone).toMillis()

      const mockEndTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockEnDate
      }).setZone(defaultTimezone).toMillis()
      
      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({
        startDate: mockStartTime, endDate: mockEndTime}), { wrapper });
      
      expect(result.current.isForwardDisable).toBe(false);
      expect(result.current.isPreviousDisable).toBe(true);

      act(() => {
        result.current.onChangeCalendarPeriod(FORWARD);
      });

      expect(result.current.calendarPeriod.month).toBe(11);
      expect(result.current.calendarPeriod.year).toBe(defaultMockYaer);

      expect(result.current.isForwardDisable).toBe(true);
      expect(result.current.isPreviousDisable).toBe(false);
    });

    it('should change calendarPeriod backword', () => {
      const currentDate = mockDate.toMillis();

      const mockStartTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockStartMonth - 1
      }).setZone(defaultTimezone).toMillis();

      const mockEndTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockEnDate
      }).setZone(defaultTimezone).toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({startDate: mockStartTime, endDate: mockEndTime}), { wrapper });

      expect(result.current.isForwardDisable).toBe(false);
      expect(result.current.isPreviousDisable).toBe(false);

      act(() => {
        result.current.onChangeCalendarPeriod(PREVIOUS);
      });

      expect(result.current.calendarPeriod.month).toBe(9);
      expect(result.current.calendarPeriod.year).toBe(defaultMockYaer);

      expect(result.current.isForwardDisable).toBe(false);
      expect(result.current.isPreviousDisable).toBe(true);
    });

    it('should change calendarPeriod forward to next year', () => {
      const mockDate = DateTime.fromObject({year: defaultMockYaer, month: 12}).setZone(defaultTimezone)
      const currentDate = mockDate.toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({}), { wrapper });

      act(() => {
        result.current.onChangeCalendarPeriod(FORWARD);
      });

      expect(result.current.calendarPeriod.month).toBe(1);
      expect(result.current.calendarPeriod.year).toBe(defaultMockYaer + 1);
    });

    it('should change calendarPeriod BACK to previous year', () => {
      const mockDate = DateTime.fromObject({year: defaultMockYaer, month: 1}).setZone(defaultTimezone)
      const currentDate = mockDate.toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({}), { wrapper });

      act(() => {
        result.current.onChangeCalendarPeriod(PREVIOUS);
      });

      expect(result.current.calendarPeriod.month).toBe(12);
      expect(result.current.calendarPeriod.year).toBe(defaultMockYaer - 1);
    });

    it ("should disable when expired", () => {
      const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth}).setZone(defaultTimezone)
      const currentDate = mockDate.toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const mockStartTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockStartMonth - 2
      }).setZone(defaultTimezone).toMillis();

      const mockEndTime = DateTime.fromObject({
        year: defaultMockYaer,
        month: mockEnDate -1
      }).setZone(defaultTimezone).toMillis();

      const { result } = renderHook(() => useDatePicker({startDate: mockStartTime, endDate: mockEndTime}), { wrapper });

      expect(result.current.isForwardDisable).toBe(true);
      expect(result.current.isPreviousDisable).toBe(true);
    });
  });

  describe('initial calendar', () => {
    const mockDate = DateTime.fromObject({year: defaultMockYaer, month: 11}).setZone(defaultTimezone);
    
    it('should match', async () => {
      const currentDate = mockDate.toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({}), {
        wrapper,
      });

      const mockResult = getMockCalenarArray(defaultMockResult);

      expect(result.current.calendarArray).toEqual(mockResult);
    });

    it ('it should match when switch period', () => {
      const currentDate = mockDate.toMillis();

      const wrapper = ({ children }: { children: ReactNode }) => (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          {children}
        </DateSlotPickContext>
      );

      const { result } = renderHook(() => useDatePicker({}), {
        wrapper,
      });

      act(() => {
        result.current.onChangeCalendarPeriod(FORWARD);
      });

      const mockResult = getMockCalenarArray(nextPeriodMockResult);

      expect(result.current.calendarArray).toEqual(mockResult);
    });
  });

  describe('select date', () => {
    const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth}).setZone(defaultTimezone);
    const currentDate = mockDate.toMillis();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
        {children}
      </DateSlotPickContext>
    );
    
    it ("should auto select next available date - no disable date", () => {
      const { result } = renderHook(() => useDatePicker({}), {
        wrapper,
      });

      const resultDate = DateTime.fromObject({
        year: defaultMockYaer,
        month: defaultMockMonth,
        day: mockDate.day
      }).setZone(defaultTimezone)

      expect(result.current.selectedDate?.toMillis()).toBe(resultDate.toMillis())
    });    

    it ("should auto selected next available date - disableSpecific", () => {
      const disableSpecific = [mockDate.day];
      const { result } = renderHook(() => useDatePicker({
        disableSpecific
      }), {
        wrapper,
      });

      const resultDate = DateTime.fromObject({
        year: defaultMockYaer,
        month: defaultMockMonth,
        day: mockDate.day + 1
      });
      
      expect(result.current.selectedDate?.toMillis()).toBe(resultDate.toMillis())
    });

    it ("should auto selected next available date - disableSpecific", () => {
      const disableWeekly = [mockDate.weekday];
      const { result } = renderHook(() => useDatePicker({
        disableWeekly
      }), {
        wrapper,
      });

      const resultDate = DateTime.fromObject({
        year: defaultMockYaer,
        month: defaultMockMonth,
        day: mockDate.day + 1
      });
      
      expect(result.current.selectedDate?.toMillis()).toBe(resultDate.toMillis())
    });

    it ("should auto selected next available date - disableSpecific", () => {
      const disableDate = [currentDate];
      const { result } = renderHook(() => useDatePicker({
        disableDate
      }), {
        wrapper,
      });

      const resultDate = DateTime.fromObject({
        year: defaultMockYaer,
        month: defaultMockMonth,
        day: mockDate.day + 1
      });
      
      expect(result.current.selectedDate?.toMillis()).toBe(resultDate.toMillis())
    });
  });
});