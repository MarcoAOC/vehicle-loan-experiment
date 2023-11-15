import { InvalidParametersException } from 'src/common/exceptions/invalid-parameters.exception';

export class NegativeValueIsNotAllowed extends InvalidParametersException {
  constructor(fieldName: string, value: number) {
    super(
      `Negative value is not allowed to ${fieldName}. ${value} was received`,
    );
  }
}

export class ValueMustBeANumber extends InvalidParametersException {
  constructor(fieldName: string, value: string) {
    super(`${fieldName} value must be a number. ${value} was received`);
  }
}

export class ValueMustBeAnInteger extends InvalidParametersException {
  constructor(fieldName: string, value: string) {
    super(`${fieldName} value must be an integer. ${value} was received`);
  }
}
