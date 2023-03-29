import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { DateSlotPicker } from '@react/datetimeslot-pick'

export default {
  title: 'Example/DateSlotPicker',
  component: DateSlotPicker,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DateSlotPicker>;

const Template: ComponentStory<typeof DateSlotPicker> = (args) => <DateSlotPicker {...args} />;

export const defaultSetting= Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
//   await userEvent.click(loginButton);
// };