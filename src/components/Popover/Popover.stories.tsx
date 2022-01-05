import { ComponentStory, ComponentMeta } from '@storybook/react';
// eslint-disable-next-line
import Popover from './Popover';

export default {
  /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
  title: 'Design Systems/Popover',
  component: Popover,
  argTypes: {
    type: {
      options: ['menuItem', 'button'],
      control: { type: 'select' },
    },
  },
  parameters: {
    options: {
      showPanel: true,
    },
  },
} as ComponentMeta<typeof Popover>;

// eslint-disable-next-line
const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Default = Template.bind({});
Default.args = {};

// export const WLED = Template.bind({});
// WLED.args = {
//   name: 'wled',
// };
