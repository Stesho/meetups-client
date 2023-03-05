import React from "react";
import { IntlProvider } from "react-intl";
import { DateInput } from "../DateInput";
import { render, screen, fireEvent } from '@testing-library/react';
import Translation from "../../../../core/utils/translation";
import English from '../../../../i18n/en-US.json';

type Status = 'success' | 'invalid' | 'default';

const DateInputWrapper = (props: {value: string, status?: Status}): JSX.Element => (
  <IntlProvider messages={English} locale='en'>
    <DateInput
      id='test'
      value={props.value}
      status={props.status}
      setValue={() => {}}
      label={Translation.plainText('label')}
      helpText={Translation.plainText('Invalid value')}
    />
  </IntlProvider>
)

describe('DateInput', () => {
  test('input rendered with correct value', () => {
    render(<DateInputWrapper value='15 Января 2023 15:00'/>);
    
    const input = screen.getByDisplayValue('15 Января 2023 15:00');
    
    expect(input).toBeInTheDocument();
  });
  
  test('the Datepicker should not be rendered before the input is clicked', () => {
    render(<DateInputWrapper value=''/>);
    
    const datepicker = screen.getByTestId('datePicker');
    
    expect(datepicker).toHaveClass('invisible');
  });

  test('the Datepicker should be rendered after the input is clicked', () => {
    render(<DateInputWrapper value='15 Января 2023 15:00'/>);
    
    const input = screen.getByDisplayValue('15 Января 2023 15:00');
    const datepicker = screen.getByTestId('datePicker');
    fireEvent.click(input);
    
    expect(datepicker).not.toHaveClass('invisible');
  });

  test('if error message is rendered when input have invalid status', () => {
    render(<DateInputWrapper value='' status='invalid'/>);
    
    const errorMessage = screen.getByText('Invalid value');

    expect(errorMessage).toBeInTheDocument();
  });
});