import { calculateDaysInMonth } from "../calculateDaysInMonth";
import { Day } from '../../../../components/ui/dateInput/DateInput';
import daysInMonthConst from './daysInMonth.json';

const getDaysNumber = (days: Day[] | null) => (
  days?.map(day => day.number)
);

describe('Calculate days in month', () => {
  it('should return correct days in passed year and month', () => {
    const daysInJanuary2023 = calculateDaysInMonth(2023, 0);
    const daysInFebruary2023 = calculateDaysInMonth(2023, 1);
    const daysInMay2023 = calculateDaysInMonth(2023, 4);
    const daysInJuly2023 = calculateDaysInMonth(2023, 6);
    const daysInOctober2023 = calculateDaysInMonth(2023, 9);

    expect(getDaysNumber(daysInJanuary2023)).toEqual(daysInMonthConst.JANUARY_2023);
    expect(getDaysNumber(daysInFebruary2023)).toEqual(daysInMonthConst.FEBRUARY_2023);
    expect(getDaysNumber(daysInMay2023)).toEqual(daysInMonthConst.MAY_2023);
    expect(getDaysNumber(daysInJuly2023)).toEqual(daysInMonthConst.JULY_2023);
    expect(getDaysNumber(daysInOctober2023)).toEqual(daysInMonthConst.OCTOBER_2023);
  });

  it('should return the correct date for boundary values', () => {
    const daysInJanuary1970 = calculateDaysInMonth(1970, 0);
    const daysInDecember2099 = calculateDaysInMonth(2099, 11);

    expect(getDaysNumber(daysInJanuary1970)).toEqual(daysInMonthConst.JANUARY_1970);
    expect(getDaysNumber(daysInDecember2099)).toEqual(daysInMonthConst.DECEMBER_2099);
  });

  it('should return null is invalid values passed', () => {
    const invalidYearMin = calculateDaysInMonth(1969, 1);
    const invalidYearMax = calculateDaysInMonth(2100, 1);
    const invalidMonthMin = calculateDaysInMonth(2023, -1);
    const invalidMonthMax = calculateDaysInMonth(2023, 12);

    expect(invalidYearMin).toBeNull();
    expect(invalidYearMax).toBeNull();
    expect(invalidMonthMin).toBeNull();
    expect(invalidMonthMax).toBeNull();
  });
})