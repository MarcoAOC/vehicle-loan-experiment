import { valueToUsdCurrency } from 'src/common/converters/numbers.converter';
import { InternalServerErrorException } from 'src/common/exceptions/internal-server-error.exception';

export class PersonCreditScoreNotSupportedException extends InternalServerErrorException {
  constructor(value: number) {
    super(`We are currently not supporting this person credit score ${value}`);
  }
}

export class LoanTermNotSupportedException extends InternalServerErrorException {
  constructor(value: number) {
    super(`We are currently not supporting this loan term value ${value}`);
  }
}

export class LoanAmmountExceedsYourLimitException extends InternalServerErrorException {
  constructor(value: number, limit: number) {
    super(
      `This loan ammount of ${valueToUsdCurrency(
        value,
      )} exceeds your limit of ${valueToUsdCurrency(limit)}`,
    );
  }
}

export class LoanAmmountTooLowException extends InternalServerErrorException {
  constructor(value: number, minimumValue: number) {
    super(
      `This loan ammount of ${valueToUsdCurrency(
        value,
      )} is too low, choose at least $ ${valueToUsdCurrency(minimumValue)}`,
    );
  }
}
