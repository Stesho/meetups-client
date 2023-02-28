import { checkDateValidity } from "../checkDateValidity";
import dates from './datesFormats.json';

describe('checkDateValidity', () => {
  test('leap year', () => {
    expect(checkDateValidity(dates.leapYear.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.leapYear.invalid)).toBeFalsy();    
  });

  test('minimum admissible day number', () => {
    expect(checkDateValidity(dates.minDay.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.minDay.invalid)).toBeFalsy();    
  });

  test('maximum admissible day number', () => {
    expect(checkDateValidity(dates.maxDay.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.maxDay.invalid)).toBeFalsy();    
  });

  test('correct spelling of the month', () => {
    expect(checkDateValidity(dates.month.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.month.invalid)).toBeFalsy();    
  });

  test('minimum admissible year', () => {
    expect(checkDateValidity(dates.minYear.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.minYear.invalid)).toBeFalsy();    
  });

  test('maximum admissible year', () => {
    expect(checkDateValidity(dates.maxYear.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.maxYear.invalid)).toBeFalsy();    
  });

  test('minimum admissible hour', () => {
    expect(checkDateValidity(dates.minHour.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.minHour.invalid)).toBeFalsy();    
  });

  test('maximum admissible hour', () => {
    expect(checkDateValidity(dates.maxHour.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.maxHour.invalid)).toBeFalsy();    
  });

  test('minimum admissible minutes', () => {
    expect(checkDateValidity(dates.minMinutes.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.minMinutes.invalid)).toBeFalsy();    
  });

  test('maximum admissible minutes', () => {
    expect(checkDateValidity(dates.maxMinutes.valid)).toBeTruthy();    
    expect(checkDateValidity(dates.maxMinutes.invalid)).toBeFalsy();    
  });
});