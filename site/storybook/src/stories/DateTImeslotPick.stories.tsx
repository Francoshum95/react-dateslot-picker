import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {DateSlotPicker} from '@react/datetimeslot-pick';
import '@react/datetimeslot-pick/dist/style.css'

export default {
  title: 'Example/DateSlotPicker',
  component: DateSlotPicker,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DateSlotPicker>;

const Template: ComponentStory<typeof DateSlotPicker> = (args) => <DateSlotPicker {...args} />;

export const Default= Template.bind({});
Default.args = {
  startDate: 1672549200000,
  endDate: 1701406800000,
  currentDate: 1680321600000,
  dailyTimePair: [{
    startTime: [10, 0],
    endTime: [12, 0]
  }, {
    startTime: [14, 0],
    endTime: [23, 59]
  }],
  disableWeekly:[1],
  disableSpecific: [1],
  disableDate: [1680580800000],
  fullBooking: [1680804000000,],
  timezone: "America/Toronto",
  duration: 30
};