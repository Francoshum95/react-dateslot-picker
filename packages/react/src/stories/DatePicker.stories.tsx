import { DatePicker } from "../components";
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


export default {
  title: 'Example/DatePicker',
  component: DatePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker/>;
export const test = Template.bind({});
