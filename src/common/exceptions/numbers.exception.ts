import { InvalidParametersException } from 'src/common/exceptions/invalid-parameters.exception';

export class NegativeValueIsNotAllowedException extends InvalidParametersException {
  constructor(fieldName: string, value: number) {
    super(`Negative value is not allowed to ${fieldName}. ${value} was received`);
  }
}

export class ValueMustBeFloatException extends InvalidParametersException {
  constructor(fieldName: string, value: string) {
    super(`${fieldName} value must be float. ${value} was received`);
  }
}

export class ValueMustBeIntegerException extends InvalidParametersException {
  constructor(fieldName: string, value: string) {
    super(`${fieldName} value must be integer. ${value} was received`);
  }
}
