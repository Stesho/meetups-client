import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LabeledInput } from '../components/ui/labeledInput/LabeledInput';
import Translation from '../core/utils/translation';

export default {
  title: 'UI/Labeled Input',
  component: LabeledInput,
} as ComponentMeta<typeof LabeledInput>;

const Template: ComponentStory<typeof LabeledInput> = (args) => (
  <LabeledInput {...args} />
);

export const JustLabel = Template.bind({});
JustLabel.args = {
  type: 'text',
  onChange: (newValue: string) => console.log(newValue),
  placeholder: 'Test placeholder',
  label: Translation.translatedText('Here is a label'),
};

export const WithDefaultHelpText = Template.bind({});
WithDefaultHelpText.args = {
  disabled: false,
  type: 'text',
  onChange: (newValue: string) => console.log(newValue),
  placeholder: 'Test placeholder',
  label: Translation.translatedText('Here is a label'),
  helpText: Translation.translatedText('You need to insert some data'),
};

export const WithHelpTextSuccess = Template.bind({});
WithHelpTextSuccess.args = {
  type: 'text',
  onChange: (newValue: string) => console.log(newValue),
  status: 'success',
  placeholder: 'Test placeholder',
  label: Translation.translatedText('Field label'),
  helpText: Translation.translatedText('You need to insert some data'),
};

export const WithHelpTextError = Template.bind({});
WithHelpTextError.args = {
  type: 'text',
  onChange: (newValue: string) => console.log(newValue),
  status: 'invalid',
  placeholder: 'Test placeholder',
  label: Translation.translatedText('Field label'),
  helpText: Translation.translatedText('You need to insert some data'),
};
