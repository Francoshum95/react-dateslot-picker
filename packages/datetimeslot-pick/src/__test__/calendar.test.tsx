import { describe, expect, it, beforeEach } from 'vitest';
import { cleanup, render, fireEvent, screen, within } from '@testing-library/react';
import { DateTime } from 'luxon';

import { DateSlotPickContext } from '../context/DateSlotPickContext';
import DatePicker from '../components/DatePicker';
import { defaultTimezone } from '../utils/common';

import { monthStr } from '../components/constant';

const defaultMockYaer = 2023;
const defaultMockMonth = 11;

describe('<DatePicker/>', () => {
  const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth, day: 1}).setZone(defaultTimezone)
  const currentDate = mockDate.toMillis()

  describe("click onChangeCalendarPeriod button", () => {
    beforeEach(() => {
      cleanup()
      render (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          <DatePicker/>
        </DateSlotPickContext>
      );   
    })
    it ("should click previous button", () => {
      fireEvent.click(screen.getByTestId("button-previous"));
      
      const resultMonth = within(screen.getByTestId('calendar-month'));
      const resultYear = within(screen.getByTestId('calendar-year'));

      expect(resultMonth.getByText(monthStr[defaultMockMonth - 1])).toBeTruthy();
      expect(resultYear.getByText(defaultMockYaer)).toBeTruthy();
    });

    it ("should click forward button", () => {      
      fireEvent.click(screen.getByTestId("button-forward"));
      
      const resultMonth = within(screen.getByTestId('calendar-month'));
      const resultYear = within(screen.getByTestId('calendar-year'));

      expect(resultMonth.getByText(monthStr[defaultMockMonth + 1])).toBeTruthy();
      expect(resultYear.getByText(defaultMockYaer)).toBeTruthy();
    });
  });

  describe("disable date", () => {
    beforeEach(() => {
      cleanup()
    })

    it ("should disable weekday", () => {
      render (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          <DatePicker
            disableWeekly={[1]}
          />
        </DateSlotPickContext>
      );
      
      expect(screen.getByText('6').closest('button')).toHaveProperty('disabled', true); 
    }); 

    it ("should disable specific day", () => {
      render (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          <DatePicker
            disableSpecific={[1]}
          />
        </DateSlotPickContext>
      );
      
      expect(screen.getByText('1').closest('button')).toHaveProperty('disabled', true); 
    }); 

    it ("should disable specific date", () => {
      render (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          <DatePicker
            disableSpecific={[1698883200]}
          />
        </DateSlotPickContext>
      );

            
      expect(screen.getByText('1').closest('button')).toHaveProperty('disabled', true); 
    }); 

    it ("should disable past date", () => {
      const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth , day: 10}).setZone(defaultTimezone)
      const currentDate = mockDate.toMillis()

      render (
        <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
          <DatePicker/>
        </DateSlotPickContext>
      );

      expect(screen.getByText('1').closest('button')).toHaveProperty('disabled', true); 
    }); 
  });
});