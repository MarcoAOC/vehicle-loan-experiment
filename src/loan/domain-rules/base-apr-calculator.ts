import getBaseLoanRules from '../data/base-loan-rules';
import { CalculateBaseAprDto } from '../dtos/calculate-base-apr.dto';
import { PersonScoreRange, TimeRange } from '../entities/apr.entities';
import { LoanAssetTypeEnum } from '../enum/loan.enum';
import {
  LoanTermNotSupportedException,
  PersonCreditScoreNotSupportedException,
} from '../exceptions/calculate-base-apr.exception';

type LoanRules = PersonScoreRange[];

export default function calculateBaseApr(
  dto: CalculateBaseAprDto,
  loanAssetType: LoanAssetTypeEnum,
): number | undefined {
  const loanRules = getBaseLoanRulesBaseOnAssetType(loanAssetType);
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
    throw new PersonCreditScoreNotSupportedException(dto.personCreditScore);

  personScoreRange.validateMaximumLoanAmount(dto.loanAmount);

  const timeRange = personScoreRange.timeRanges.find((x) => {
    const lowerLimit = x.loanTermLowerLimitInMonths ?? Number.MIN_SAFE_INTEGER;
    const upperLimit = x.loanTermUpperLimitInMonths ?? Number.MAX_SAFE_INTEGER;
    return lowerLimit <= dto.loanTermInMonths && upperLimit >= dto.loanTermInMonths;
  });

  if (timeRange == undefined) throw new LoanTermNotSupportedException(dto.loanTermInMonths);

  timeRange.validateMinimumLoanAmount(dto.loanAmount);

  return timeRange;
}

function getBaseLoanRulesBaseOnAssetType(loanAssetType: LoanAssetTypeEnum): LoanRules {
  switch (loanAssetType) {
    case LoanAssetTypeEnum.VEHICLE:
      return getBaseLoanRules();
    default:
      return getBaseLoanRules();
  }
}
