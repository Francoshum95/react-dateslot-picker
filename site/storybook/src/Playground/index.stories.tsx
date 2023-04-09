import React from 'react';
import {DateSlotPicker} from 'react-dateslot-picker';

import 'react-dateslot-picker/dist/style.css'

export default {
  title: 'PlayGround',
  component: DateSlotPicker,
} 

const Template  = args => <DateSlotPicker {...args} />;

export const Play= Template.bind({});
Play.args = {
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
  fullBooking: [1680804000000],
  timezone: "America/Toronto",
  disableDate: [1680580800000],
  duration: 30,
  onSelectDatetime: (timestamp) => {console.log(timestamp) }
};