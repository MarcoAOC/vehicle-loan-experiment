import {
  ValueMustBeIntegerException,
  ValueMustBeFloatException,
} from '../exceptions/numbers.exception';
import { castToFloat, castToInteger, valueToUsdCurrency } from './numbers.converter';

describe('castToInteger', () => {
  it('should cast string to integer', () => {
    const result = castToInteger('42');
    expect(result).toBe(42);
  });

  it('should throw ValueMustBeIntegerException for non-integer string', () => {
    expect(() => castToInteger('abc')).toThrow(ValueMustBeIntegerException);
  });
});

describe('castToFloat', () => {
  it('should cast string to float', () => {
    const result = castToFloat('42.5');
    expect(result).toBe(42.5);
  });

  it('should throw ValueMustBeFloatException for non-float string', () => {
    expect(() => castToFloat('abc')).toThrow(ValueMustBeFloatException);
  });
});

describe('valueToUsdCurrency', () => {
  it('should format number to currency string', () => {
    const result = valueToUsdCurrency(1000);
    expect(result).toBe('$1,000.00');
  });
});
