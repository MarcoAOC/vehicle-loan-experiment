import { valueToCurrency } from 'src/common/converters/numbers.converter';
import { InternalServerError } from 'src/common/exceptions/internal-server-error.exception';

export class PersonCreditScoreNotSupported extends InternalServerError {
  constructor(value: number) {
    super(`We are currently not supporting this person credit score ${value}`);
  }
}

export class LoanTermNotSupported extends InternalServerError {
  constructor(value: number) {
    super(`We are currently not supporting this loan term value ${value}`);
  }
}

export class LoanAmmountExceedsYourLimit extends InternalServerError {
  constructor(value: number, limit: number) {
    super(
      `This loan ammount of ${valueToCurrency(
        value,
      )} exceeds your limit of ${valueToCurrency(limit)}`,
    );
  }
}

export class LoanAmmountTooLow extends InternalServerError {
  constructor(value: number, minimumValue: number) {
    super(
      `This loan ammount of ${valueToCurrency(
        value,
      )} is too low, choose at least $ ${valueToCurrency(minimumValue)}`,
    );
  }
}
