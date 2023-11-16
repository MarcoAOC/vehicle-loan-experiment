import { CalculateBaseAprDto } from '../dtos/calculate-base-apr.dto';
import { PersonScoreRange, TimeRange, TimeRange37UpTo48, TimeRange49UpTo60, TimeRangeUpTo36 } from '../entities/apr.entities';
import { LoanAssetTypeEnum } from '../enum/loan.enum';
import {
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

export function validateBaseAprCalculation(
  loanRules: LoanRules,
  dto: CalculateBaseAprDto,
): TimeRange {
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
    return lowerLimit <= dto.loanTermInMonths && upperLimit >= dto.loanTermInMonths;
  });

  if (timeRange == undefined) throw new LoanTermNotSupported(dto.loanTermInMonths);

  timeRange.validateMinimumLoanAmount(dto.loanAmount);

  return timeRange;
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
    new PersonScoreRange(undefined, 600, 50000, [
      TimeRangeUpTo36(12.75),
      TimeRange37UpTo48(13.25),
      TimeRange49UpTo60(undefined),
    ]),
    new PersonScoreRange(599, 700, 75000, [
      TimeRangeUpTo36(5.75),
      TimeRange37UpTo48(6.0),
      TimeRange49UpTo60(6.65),
    ]),
    new PersonScoreRange(699, undefined, 100000, [
      TimeRangeUpTo36(4.75),
      TimeRange37UpTo48(5.0),
      TimeRange49UpTo60(5.5),
    ]),
  ];
}
