import { ValueMustBeFloatException, ValueMustBeIntegerException } from '../exceptions/numbers.exception';

type ValidatorFunction = (value: number, fieldName: string) => void;

export function castToInteger(
  value: string,
  fieldName: string,
  validators: ValidatorFunction[] | undefined = undefined,
): number {
  const intValue = parseInt(value, 10);
  if (isNaN(intValue)) throw new ValueMustBeIntegerException(fieldName, value);

  if (validators != undefined)
    validators.forEach((validator) => validator(intValue, fieldName));

  return intValue;
}

export function castToFloat(
  value: string,
  fieldName: string,
  validators: ValidatorFunction[] | undefined = undefined,
): number {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) throw new ValueMustBeFloatException(fieldName, value);

  if (validators != undefined)
    validators.forEach((validator) => validator(floatValue, fieldName));

  return floatValue;
}

export function valueToCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
