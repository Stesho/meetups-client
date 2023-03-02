import { MONTH_NAMES } from "../constants/dateTimeConstants";

const dateToISOString = (date: string): string => {
  try {
    if (date === '') {
      return date;
    }
  
    const [day, month, year, time] = date.split(' ');
    const [hours, minutes] = time.split(':');
    const monthNumber = MONTH_NAMES.indexOf(month);
    const timeZoneOffset = new Date().getTimezoneOffset();
    const minutesWithOffset = Number(minutes) - timeZoneOffset;

    return new Date(
      Number(year),
      monthNumber,
      Number(day),
      Number(hours),
      minutesWithOffset
    ).toISOString();
  }
  catch {
    return '';
  }
};

export default dateToISOString