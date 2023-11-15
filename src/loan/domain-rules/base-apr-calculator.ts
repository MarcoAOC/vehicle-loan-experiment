import { CalculateBaseAprDto } from '../dtos/calculate-base-apr.dto';
import { LoanAssetTypeEnum } from '../enum/loan.enum';
import {
  LoanAmmountExceedsYourLimit,
  LoanAmmountTooLow,
  LoanTermNotSupported,
  PersonCreditScoreNotSupported,
} from '../exceptions/calculate-base-apr.exception';

export default function calculateBaseApr(
  dto: CalculateBaseAprDto,
  loanAssetType: LoanAssetTypeEnum,
): number | undefined {
  const loanRules = maybeAfactory(loanAssetType);
  const timeRange = validateBaseAprCalculation(loanRules, dto);

  return timeRange.baseValue;
}

function validateBaseAprCalculation(
  loanRules: LoanRules,
  dto: CalculateBaseAprDto,
): TimeRange {
  //talvez colocar mais logs aqui
  const personScoreRange = loanRules.find((x) => {
    const lowerLimit = x.personCreditScoreLowerLimit ?? Number.MIN_SAFE_INTEGER;
    const upperLimit = x.personCreditScoreUpperLimit ?? Number.MAX_SAFE_INTEGER;
    return lowerLimit < dto.personCreditScore && upperLimit > dto.personCreditScore;
  });

  if (personScoreRange == undefined)
    throw new PersonCreditScoreNotSupported(dto.personCreditScore);

  personScoreRange.validateMaximumLoanAmount(dto.loanAmount);

  const timeRange = personScoreRange.timeRanges.find((x) => {
    const lowerLimit = x.loanTermLowerLimitInMonths ?? Number.MIN_SAFE_INTEGER;
    const upperLimit = x.loanTermUpperLimitInMonths ?? Number.MAX_SAFE_INTEGER;
    return lowerLimit < dto.loanTermInMonths && upperLimit > dto.loanTermInMonths;
  });

  if (timeRange == undefined) throw new LoanTermNotSupported(dto.loanTermInMonths);

  timeRange.validateMinimumLoanAmount(dto.loanAmount);

  return timeRange;
}

// SEPARAR TODA ESSA PARTE ABAIXO
class TimeRange {
  loanTermLowerLimitInMonths: number | undefined;
  loanTermUpperLimitInMonths: number | undefined;
  baseValue: number | undefined;
  readonly minimumLoanAmount: number;

  constructor(
    loanTermLowerLimitInMonths: number | undefined,
    loanTermUpperLimitInMonths: number | undefined,
    baseValue: number | undefined,
    minimumLoanAmount: number,
  ) {
    this.loanTermUpperLimitInMonths = loanTermUpperLimitInMonths;
    this.loanTermLowerLimitInMonths = loanTermLowerLimitInMonths;
    this.baseValue = baseValue;
    this.minimumLoanAmount = minimumLoanAmount;
  }

  validateMinimumLoanAmount(loanAmount: number) {
    if (loanAmount < this.minimumLoanAmount)
      throw new LoanAmmountTooLow(loanAmount, this.minimumLoanAmount);
  }
}

class PersonScoreRange {
  personCreditScoreLowerLimit: number | undefined;
  personCreditScoreUpperLimit: number | undefined;
  timeRanges: TimeRange[];
  readonly maximumLoanAmount: number;

  constructor(
    personCreditScoreLowerLimit: number | undefined,
    personCreditScoreUpperLimit: number | undefined,
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
      throw new LoanAmmountExceedsYourLimit(loanAmount, this.maximumLoanAmount);
  }
}

type LoanRules = PersonScoreRange[];

function maybeAfactory(loanAssetType: LoanAssetTypeEnum): LoanRules {
  //criar uma factory aqui ?
  switch (loanAssetType) {
    case LoanAssetTypeEnum.VEHICLE:
      return getBaseLoanRules();
    default:
      return getBaseLoanRules();
  }
}

function getBaseLoanRules() {
  return [
    // Olhar esses ranges para ver a questao do <= e >=

    new PersonScoreRange(undefined, 600, 50000, [
      new TimeRange(undefined, 37, 12.75, 5000), //Criar timeranges defautl para nao repetir os ranges e o minimum value
      new TimeRange(36, 49, 13.25, 10000),
      new TimeRange(48, 61, undefined, 15000),
    ]),
    new PersonScoreRange(599, 700, 75000, [
      new TimeRange(undefined, 37, 5.75, 5000),
      new TimeRange(36, 49, 6.0, 10000),
      new TimeRange(48, 61, 6.65, 15000),
    ]),
    new PersonScoreRange(699, undefined, 100000, [
      new TimeRange(undefined, 37, 4.75, 5000),
      new TimeRange(36, 49, 5.0, 10000),
      new TimeRange(48, 61, 5.5, 15000),
    ]),
  ];
}
