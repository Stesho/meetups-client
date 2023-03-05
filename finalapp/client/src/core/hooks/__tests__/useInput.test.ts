import { useInput } from "../useInput";
import Translation from "../../utils/translation";
import { checkMinLength, checkMaxLength, checkRegExp } from "../../utils/inputValidation";
import { renderHook, act } from '@testing-library/react';

const validationOptions = {
  minLength: checkMinLength(5),
  maxLength: checkMaxLength(10),
  regExp: checkRegExp(/^\+?(0|[1-9]\d*)$/), // only numbers
};

const errorMessages = {
  minLength: Translation.plainText('min length error'),
  maxLength: Translation.plainText('max length error'),
  regExp: Translation.plainText('regular expression error'),
};

const renderUseInput = () => {
  return renderHook(() => (
    useInput({validationOptions, errorMessages})
  ));
}

describe('useInput', () => {
  it('should be valid if value passed all the tests', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setValue('123456');
    })

    expect(result.current.isValid).toBeTruthy();
  });

  it('should be invalid if value failed at least one test', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setIsOnBlur(true);
      result.current.setValue('');
    })

    expect(result.current.isValid).toBeFalsy();
  });

  it('should return "min length error" message if value has less length than passed', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setIsOnBlur(true);
      result.current.setValue('1234');
    })

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.message.params.text).toEqual(errorMessages.minLength.params.text);
  });

  it('should return "max length error" message if value has greater length than passed', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setIsOnBlur(true);
      result.current.setValue('12345678910');
    })

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.message.params.text).toEqual(errorMessages.maxLength.params.text);
  });

  it('should return "regular expression error" message if value does not match to regular expression', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setIsOnBlur(true);
      result.current.setValue('aaaaa');
    })

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.message.params.text).toEqual(errorMessages.regExp.params.text);
  });

  it('should return first error message if value failed more than one test', () => {
    const { result } = renderUseInput();

    act(() => {
      result.current.setIsOnBlur(true);
      result.current.setValue('aaa');
    })

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.message.params.text).toEqual(errorMessages.minLength.params.text);
  });
})