import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextArea } from '../components/ui/textArea/TextArea';
import Translation from '../core/utils/translation';

export default {
  title: 'UI/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const BasicTextArea = Template.bind({});
BasicTextArea.args = {
  name: Translation.translatedText('Описание'),
};

export const CountingTextArea = Template.bind({});
CountingTextArea.args = {
  name: Translation.translatedText('Описание'),
  maxLength: 15,
};
