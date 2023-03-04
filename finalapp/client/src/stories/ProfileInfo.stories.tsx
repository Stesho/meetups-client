import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileInfo } from '../components/profile/profileInfo/ProfileInfo';

export default {
  title: 'ProfileInfo',
  component: ProfileInfo,
} as ComponentMeta<typeof ProfileInfo>;

const Template: ComponentStory<typeof ProfileInfo> = (args) => (
  <ProfileInfo {...args} />
);

export const FirstName = Template.bind({});
FirstName.args = {
  user: {
    id: 'jjjj',
    name: 'Jony',
    surname: 'Boy',
  },
  first: 'name',
  avatarHeightPX: 40,
  text: {
    fontWeight: '400',
    fontSize: '16px',
    color: '#FFF',
  },
  style: {
    background: '#aab6ca',
  },
};

export const FirstAvatar = Template.bind({});
FirstAvatar.args = {
  user: {
    id: 'jjjj',
    name: 'Jony',
    surname: 'Boy',
  },
  first: 'avatar',
  avatarHeightPX: 30,
  text: {
    fontWeight: '400',
    fontSize: '14px',
    color: '#5B6887',
  },
};

export const EmptyUserName = Template.bind({});
EmptyUserName.args = {
  user: {
    id: 'jjjj',
    name: '',
    surname: '',
  },
  first: 'avatar',
  avatarHeightPX: 30,
  text: {
    fontWeight: '400',
    fontSize: '14px',
    color: '#5B6887',
  },
};
