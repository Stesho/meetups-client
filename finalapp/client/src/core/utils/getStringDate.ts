import { MONTH_NAMES } from "../constants/dateTimeConstants";

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

export default getStringDate;