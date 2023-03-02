import { MONTH_NAMES } from "../constants/dateTimeConstants";

const dateFromISOToReadable = (ISOString: string): string => {
  const date = new Date(ISOString);
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const timeZoneOffset = new Date().getTimezoneOffset();
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes() + timeZoneOffset}`.padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export default dateFromISOToReadable;