import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../components/ui/button/Button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary button',
  type: 'primary',
  disabled: false,
  callback: () => {},
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary button',
  type: 'secondary',
  disabled: false,
  callback: () => {},
};

export const Default = Template.bind({});
Default.args = {
  children: 'Default button',
  type: 'default',
  disabled: false,
  callback: () => {},
};
