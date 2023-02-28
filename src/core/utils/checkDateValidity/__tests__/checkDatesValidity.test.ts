import { checkDatesValidity } from "../checkDateValidity";
import datesValidity from './datesValidity.json';

type DateValidityOption = keyof typeof datesValidity;

const getDatesValidity = (option: DateValidityOption) => {
  const startDate = datesValidity[option].start;
  const finishDate = datesValidity[option].finish;
  const validDates = checkDatesValidity(startDate, finishDate);
  const invalidDates = checkDatesValidity(finishDate, startDate);
  return {
    validDates,
    invalidDates
  }
}

describe('checkDatesValidity', () => {
  test('if start day earlier than finish day', () => {
    const { validDates, invalidDates } = getDatesValidity('day');

    expect(validDates).toBeTruthy();
    expect(invalidDates).toBeFalsy();
  });

  test('if start month earlier than finish month', () => {
    const { validDates, invalidDates } = getDatesValidity('month');

    expect(validDates).toBeTruthy();
    expect(invalidDates).toBeFalsy();
  });

  test('if start year earlier than finish year', () => {
    const { validDates, invalidDates } = getDatesValidity('year');

    expect(validDates).toBeTruthy();
    expect(invalidDates).toBeFalsy();
  });

  test('if start hours earlier than finish hours', () => {
    const { validDates, invalidDates } = getDatesValidity('hours');

    expect(validDates).toBeTruthy();
    expect(invalidDates).toBeFalsy();
  });

  test('if start minutes earlier than finish minutes', () => {
    const { validDates, invalidDates } = getDatesValidity('minutes');

    expect(validDates).toBeTruthy();
    expect(invalidDates).toBeFalsy();
  });
});