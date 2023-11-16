import {
  LoanAmmountExceedsYourLimitException,
  LoanAmmountTooLowException,
} from '../exceptions/calculate-base-apr.exception';

type MaybeNumber = number | undefined;
export class TimeRange {
  loanTermLowerLimitInMonths: MaybeNumber;
  loanTermUpperLimitInMonths: MaybeNumber;
  baseValue: MaybeNumber;
  readonly minimumLoanAmount: number;

  constructor(
    loanTermLowerLimitInMonths: MaybeNumber,
    loanTermUpperLimitInMonths: MaybeNumber,
    baseValue: MaybeNumber,
    minimumLoanAmount: number,
  ) {
    this.loanTermUpperLimitInMonths = loanTermUpperLimitInMonths;
    this.loanTermLowerLimitInMonths = loanTermLowerLimitInMonths;
    this.baseValue = baseValue;
    this.minimumLoanAmount = minimumLoanAmount;
  }

  validateMinimumLoanAmount(loanAmount: number) {
    if (loanAmount < this.minimumLoanAmount)
      throw new LoanAmmountTooLowException(loanAmount, this.minimumLoanAmount);
  }
}

export class PersonScoreRange {
  personCreditScoreLowerLimit: MaybeNumber;
  personCreditScoreUpperLimit: MaybeNumber;
  timeRanges: TimeRange[];
  readonly maximumLoanAmount: number;

  constructor(
    personCreditScoreLowerLimit: MaybeNumber,
    personCreditScoreUpperLimit: MaybeNumber,
    maximumLoanAmount: number,
    timeRanges: TimeRange[],
  ) {
    this.personCreditScoreUpperLimit = personCreditScoreUpperLimit;
    this.personCreditScoreLowerLimit = personCreditScoreLowerLimit;
    this.timeRanges = timeRanges;
    this.maximumLoanAmount = maximumLoanAmount;
  }

  validateMaximumLoanAmount(loanAmount: number) {
    if (loanAmount > this.maximumLoanAmount)
      throw new LoanAmmountExceedsYourLimitException(loanAmount, this.maximumLoanAmount);
  }
}


export const TimeRangeUpTo36 = (baseValue: number) => new TimeRange(undefined, 36, baseValue, 5000)
export const TimeRange37UpTo48 = (baseValue: number) => new TimeRange(37, 48, baseValue, 10000)
export const TimeRange49UpTo60 = (baseValue: MaybeNumber) => new TimeRange(49, 60, baseValue, 15000)
