import React, { useState } from 'react';
import styles from './DateInput.module.scss';
import { ReactComponent as CalendarImg } from '../../../assets/icons/calendar-icon.svg';
import { LabeledInput } from '../labeledInput/LabeledInput';
import { MONTH_NAMES } from '../../../core/constants/dateTimeConstants';
import { DatePicker } from './datePicker/DatePicker';
import useOutsideClick from '../../../core/hooks/useOutsideClick';
import classNames from 'classnames';
import Translation from '../../../core/utils/translation';
import dateToISOString from '../../../core/utils/dateToISOString';

export type Day = {
  number: number;
  isCurrentMoth: boolean;
};

export interface DateInputProps {
  id: string;
  value: string;
  setValue: (newDate: string) => void;
  onBlur?: () => void;
  status?: 'success' | 'invalid' | 'default';
  className?: string;
  label: Translation;
  helpText?: Translation;
}

export const DateInput = (props: DateInputProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dateInput = useOutsideClick(() => setIsOpen(false));
  const initialValue = props.value;

  const inputClass = classNames(props.className, styles.input);

  const getStringDate = (
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
  ): string => {
    let newValue = '';
    if (day !== undefined && hours !== undefined && hours !== undefined) {
      const formatedHours = `${hours}`.padStart(2, '0');
      const formatedMinutes = `${minutes}`.padStart(2, '0');
      newValue = `${day} ${MONTH_NAMES[month]} ${year} ${formatedHours}:${formatedMinutes}`;
    }
    return newValue;
  };

  const onDatePick = (
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
  ) => {
    const newValue = getStringDate(year, month, day, hours, minutes);
    props.setValue(newValue);
  };

  return (
    <div className={styles.dateInput}>
      <div ref={dateInput}>
        <div className={styles.inputWrapper} data-testid="input">
          <LabeledInput
            onChange={props.setValue}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={props.onBlur}
            value={props.value}
            className={inputClass}
            status={props.status}
            label={props.label}
            helpText={props.helpText}
          />
          <CalendarImg className={styles.calendarImg} />
        </div>
        <DatePicker
          className={isOpen ? styles.visible : styles.invisible}
          onDatePick={onDatePick}
          id={props.id}
          initialDate={new Date(dateToISOString(initialValue))}
        />
      </div>
    </div>
  );
};
