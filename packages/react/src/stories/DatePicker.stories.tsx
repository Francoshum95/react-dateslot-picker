import DateSlotPicker from "../components/index";
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


export default {
  title: 'Example/DateSlotPicker',
  component: DateSlotPicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DateSlotPicker>;

const Template: ComponentStory<typeof DateSlotPicker> = (args) => <DateSlotPicker/>;
export const test = Template.bind({});
