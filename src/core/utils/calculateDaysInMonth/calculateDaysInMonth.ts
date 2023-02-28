import {
  DISPLAYED_DAYS_COUNT,
} from '../../constants/dateTimeConstants';
import { Day } from '../../../components/ui/dateInput/DateInput';

const minYear = 1970;
const maxYear = 2099;
const minMonth = 0;
const maxMonth = 11;

export const calculateDaysInMonth = (year: number, month: number): Day[] | null => {
  if(year < minYear || year > maxYear || month < minMonth || month > maxMonth) {
    return null;
  }

  const newDays: Day[] = [];
  const maxDays = new Date(year, month + 1, 0).getDate() + 1;
  const maxDaysInPrevMoth = new Date(year, month, 0).getDate() + 1;
  const firstDayInMonth = new Date(year, month, 1).getDay();
  const lastDayInMonth = firstDayInMonth + maxDays - 1;
  let isCurrentMonth = false;

  for (
    let i = 0, dayNumber = maxDaysInPrevMoth - firstDayInMonth;
    i < DISPLAYED_DAYS_COUNT;
    i++, dayNumber++
  ) {
    if (dayNumber === maxDaysInPrevMoth && !isCurrentMonth) {
      dayNumber = 1;
      isCurrentMonth = true;
    }

    if (dayNumber === maxDays && isCurrentMonth) {
      dayNumber = 1;
    }

    const day: Day = {
      number: dayNumber,
      isCurrentMoth: false,
    };

    if (i >= firstDayInMonth && i < lastDayInMonth) {
      day.isCurrentMoth = true;
    }

    newDays.push(day);
  }

  return newDays;
};
