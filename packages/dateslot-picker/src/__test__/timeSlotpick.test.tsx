import { describe, expect, it, beforeEach } from 'vitest';
import { render, waitFor, screen, within, cleanup} from '@testing-library/react';
import { DateTime } from 'luxon';

import { DateSlotPickContext } from '../context/DateSlotPickContext';
import { defaultTimezone } from '../utils/common';

import DatePicker from '../components/DatePicker';
import TimeSlotpick from '../components/TimeSlotPicker';

const defaultMockYaer = 2023;
const defaultMockMonth = 11;

describe("timeslots", () => {
  beforeEach(() => {
    cleanup()
  })

  it ("should disable - fullbooking", async() => {
    const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth, day: 1, hour: 10, minute: 30}).setZone(defaultTimezone)
    const currentDate = mockDate.toMillis()
    const timeSlot  = mockDate.toFormat('HH:mm')


    render (
      <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
        <DatePicker/>
        <TimeSlotpick
          fullBooking={[currentDate]}
        />
      </DateSlotPickContext>
    );
    const test = within(screen.getByTestId("timeslots"));
    expect(test.getByText(timeSlot).closest('button')).toHaveProperty('disabled', true);
  });

  it ("should disable - expired timeslot", async() => {
    const mockDate = DateTime.fromObject({year: defaultMockYaer, month: defaultMockMonth, day: 1, hour: 10, minute: 30}).setZone(defaultTimezone)
    const currentDate = mockDate.toMillis()

    const testSelect = mockDate.minus({
      hour: 1
    })
    const timeSlot  = testSelect.toFormat('HH:mm')

    render (
      <DateSlotPickContext timezone={defaultTimezone} currentDate={currentDate}>
        <DatePicker/>
        <TimeSlotpick/>
      </DateSlotPickContext>
    );
    const test = within(screen.getByTestId("timeslots"));
    expect(test.getByText(timeSlot).closest('button')).toHaveProperty('disabled', true);
  });
});