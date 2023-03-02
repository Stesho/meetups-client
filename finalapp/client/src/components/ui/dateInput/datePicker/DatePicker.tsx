import React, { useState, useEffect } from 'react';
import styles from './DatePicker.module.scss';
import { calculateDaysInMonth } from '../../../../core/utils/calculateDaysInMonth/calculateDaysInMonth';
import {
  TIME,
  CALENDAR_MONTH_NAMES,
} from '../../../../core/constants/dateTimeConstants';
import { Day } from '../DateInput';
import LeftArrowIcon from '../../../../assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '../../../../assets/icons/right-arrow-icon.svg';

interface DatePickerProps {
  id: string;
  onDatePick: (
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
  ) => void;
  className?: string;
  initialDate?: Date;
}

export const DatePicker = (props: DatePickerProps): JSX.Element => {
  const initialYear = props.initialDate?.getFullYear() || new Date().getFullYear();
  const initialMonth = props.initialDate?.getMonth() || new Date().getMonth();
  const initialDay = props.initialDate?.getDate() || undefined;
  const hours = props.initialDate?.getHours();
  const minutes = props.initialDate?.getMinutes();
  const initialHours = hours === undefined ? hours : isNaN(hours) ? undefined : hours;
  const initialMinutes = minutes === undefined ? minutes : isNaN(minutes) ? undefined : minutes;
  const initialTime = 
    (initialHours !== undefined && initialMinutes !== undefined) ? `${initialHours}:${initialMinutes}` : undefined;

  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const [days, setDays] = useState<Day[]>([]);
  const [day, setDay] = useState<number | undefined>(initialDay);
  const [time, setTime] = useState<string | undefined>(initialTime);

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth(year, month);
    if(newDays) {
      setDays([...newDays]);
    }
  };

  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }
  };

  const parseTime = (time: string) => {
    const parsedTime = time.split(':');
    const hours = Number.parseInt(parsedTime[0]);
    const minutes = Number.parseInt(parsedTime[1]);
    return {
      hours,
      minutes,
    };
  };

  useEffect(displayDaysInCurrentMonth, [month, year]);
  useEffect(() => {
    let hours = undefined;
    let minutes = undefined;
    if (time) {
      const parsedTime = parseTime(time);
      hours = parsedTime.hours;
      minutes = parsedTime.minutes;
    }
    props.onDatePick(year, month, day, hours, minutes);
  }, [year, month, day, time]);

  return (
    <div className={`${styles.datePicker} ${props.className}`}>
      <div className={styles.date}>
        <div className={styles.monthWrapper}>
          <button
            type="button"
            className={styles.monthPrev}
            onClick={setPrevMonth}
          >
            <img src={LeftArrowIcon} alt="Left arrow" />
          </button>
          <span className={styles.month}>
            {CALENDAR_MONTH_NAMES[month]} {year}
          </span>
          <button
            type="button"
            className={styles.monthNext}
            onClick={setNextMonth}
          >
            <img src={RightArrowIcon} alt="Right arrow" />
          </button>
        </div>
        <div className={styles.weekDays}>
          <div className={styles.weekDay}>Вс</div>
          <div className={styles.weekDay}>Пн</div>
          <div className={styles.weekDay}>Вт</div>
          <div className={styles.weekDay}>Ср</div>
          <div className={styles.weekDay}>Чт</div>
          <div className={styles.weekDay}>Пт</div>
          <div className={styles.weekDay}>Сб</div>
        </div>
        <div className={styles.day}>
          {days.map((item, index) => (
            <div
              key={`${item.number}-${item.isCurrentMoth}`}
              className={styles.dayNum}
            >
              <input
                type="radio"
                name="day"
                id={`day${props.id}${index}`}
                disabled={!item.isCurrentMoth}
              />
              <label
                htmlFor={`day${props.id}${index}`}
                onClick={() =>
                  item.isCurrentMoth ? setDay(item.number) : null
                }
              >
                {item.number}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.timePicker}>
        <div className={styles.timeCaption}>Time</div>
        <div className={styles.times}>
          {TIME.map((item, index) => (
            <div key={item} className={styles.time}>
              <input type="radio" name="time" id={`time${props.id}${index}`} />
              <label
                htmlFor={`time${props.id}${index}`}
                onClick={() => setTime(item)}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
