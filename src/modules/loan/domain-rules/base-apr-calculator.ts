import { NotFoundException } from '@nestjs/common';
import { CalculateBaseAprDto } from '../dtos/calculate-base-apr.dto';

export default function calculateBaseApr(
  dto: CalculateBaseAprDto,
): number | undefined {
  const timeRange = validateBaseAprCalculation(dto);

  return timeRange.baseValue;
}

function validateBaseAprCalculation(dto: CalculateBaseAprDto): TimeRange {
  console.log('Chegou aqui na validação', dto);
  const personScoreRange = Table.find((x) => {
    const lowerLimit = x.personCreditScoreLowerLimit ?? Number.MIN_SAFE_INTEGER;
    const upperLimit = x.personCreditScoreUpperLimit ?? Number.MAX_SAFE_INTEGER;
    console.log('personScore-lower', lowerLimit);
    console.log('personScore-uper', upperLimit);
    console.log('dto.personCreditScore', dto.personCreditScore);
    return (
      lowerLimit < dto.personCreditScore && upperLimit > dto.personCreditScore
    );
  });
  if (personScoreRange == undefined) throw new NotFoundException(''); //acertar erro aqui

  console.log('personScoreRange', personScoreRange);
  personScoreRange.validateMaximumLoanAmount(dto.loanAmount);
  console.log('validated');

  const timeRange = personScoreRange.timeRanges.find((x) => {
    const lowerLimit = x.loanTermLowerLimitInMonths ?? Number.MIN_SAFE_INTEGER;
    const upperLimit = x.loanTermUpperLimitInMonths ?? Number.MAX_SAFE_INTEGER;
    console.log('timerange-lower', lowerLimit);
    console.log('timerange-uper', upperLimit);
    console.log('dto.loanTermInMonths', dto.loanTermInMonths);
    return (
      lowerLimit < dto.loanTermInMonths && upperLimit > dto.loanTermInMonths
    );
  });
  console.log('timeRange', timeRange);

  if (timeRange == undefined) throw new NotFoundException(''); //acertar erro aqui

  timeRange.validateMinimumLoanAmount(dto.loanAmount);
  console.log('validated time', timeRange);

  return timeRange;
}

// SEPARAR TODA ESSA PARTE ABAIXO
class TimeRange {
  loanTermLowerLimitInMonths: number | undefined;
  loanTermUpperLimitInMonths: number | undefined;
  baseValue: number | undefined;
  private minimumLoanAmount: number;

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
    if (loanAmount < this.minimumLoanAmount) throw new NotFoundException(); //Colocar boa mensagem de texto aqui na validação e criar uma excepion especifica
  }
}

class PersonScoreRange {
  personCreditScoreLowerLimit: number | undefined;
  personCreditScoreUpperLimit: number | undefined;
  timeRanges: TimeRange[];
  private maximumLoanAmount: number;

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
    if (loanAmount > this.maximumLoanAmount) throw new NotFoundException(); //Colocar boa mensagem de texto aqui na validação e criar uma excepion especifica
  }
}

const Table = [
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
