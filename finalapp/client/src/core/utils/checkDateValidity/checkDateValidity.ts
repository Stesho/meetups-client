import {
  MONTH_NAMES,
} from '../../constants/dateTimeConstants';

const isInteger = (value: string) => {
  return /^\+?\d+$/.test(value);
};

const checkDay = (year: number, month: number, day: number): boolean => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return day < 0 || day > daysInMonth;
}
const checkYear = (year: number): boolean => year < 1970 || year > 2099;
const checkHours = (hours: number): boolean => hours < 0 || hours > 23;
const checkMinutes = (minutes: number): boolean => minutes < 0 || minutes > 59;

export const checkDateValidity = (value: string): boolean => {
  const dateValues = value.split(' ');
  if (dateValues.length !== 4) {
    return false;
  }

  const [day, month, year, time] = dateValues;
  const [hours, minutes] = time.split(':');
  const isCorrectFormat =
    !isInteger(year) ||
    !isInteger(day) ||
    !isInteger(hours) ||
    !isInteger(minutes) ||
    MONTH_NAMES.indexOf(month) === -1;
  const isCorrectValue =
    checkYear(Number(year)) ||
    checkDay(Number(year), MONTH_NAMES.indexOf(month), Number(day)) ||
    checkHours(Number(hours)) ||
    checkMinutes(Number(minutes));

  if (isCorrectFormat || isCorrectValue) {
    return false;
  }

  return true;
};

const checkDates = (start: string, finish: string): boolean => {
  const [startDay, startMonth, startYear, startTime] = start.split(' ');
  const [finishDay, finishMonth, finishYear, finishTime] = finish.split(' ');
  const [startHours, startMinutes] = startTime.split(':');
  const [finishHours, finishMinutes] = finishTime.split(':');
  const startMonthNumber = MONTH_NAMES.indexOf(startMonth);
  const finishMonthNumber = MONTH_NAMES.indexOf(finishMonth);

  const startDate = new Date(
    Number(startYear),
    startMonthNumber,
    Number(startDay),
    Number(startHours),
    Number(startMinutes),
  );
  const finishDate = new Date(
    Number(finishYear),
    finishMonthNumber,
    Number(finishDay),
    Number(finishHours),
    Number(finishMinutes),
  );

  return startDate < finishDate;
};

export const checkDatesValidity = (start: string, finish: string): boolean => {
  return (
    (start !== '' &&
      finish !== '' &&
      checkDateValidity(start) &&
      checkDateValidity(finish) &&
      !checkDates(start, finish)) === false
  );
};
