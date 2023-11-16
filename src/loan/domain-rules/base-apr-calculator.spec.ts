import { CalculateBaseAprDto } from '../dtos/calculate-base-apr.dto';
import { PersonScoreRange, TimeRange37UpTo48, TimeRange49UpTo60, TimeRangeUpTo36 } from '../entities/apr.entities';
import { LoanAmmountExceedsYourLimit, LoanAmmountTooLow, LoanTermNotSupported, PersonCreditScoreNotSupported } from '../exceptions/calculate-base-apr.exception';
import {validateBaseAprCalculation} from './base-apr-calculator';

const baseLoanRules =  [
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

type HappyPathTuple = [CalculateBaseAprDto, number | undefined]
const happyPathScenarios: HappyPathTuple[] = [
  [new CalculateBaseAprDto(10000, 36, 700), 4.75],

  [new CalculateBaseAprDto(15000, 24, 790), 4.75],
  [new CalculateBaseAprDto(15000, 48, 900), 5],
  [new CalculateBaseAprDto(15000, 59, 700), 5.5],
  [new CalculateBaseAprDto(15000, 10, 600), 5.75],
  [new CalculateBaseAprDto(15000, 47, 650), 6],
  [new CalculateBaseAprDto(15000, 60, 699), 6.65],
  [new CalculateBaseAprDto(15000, 36, 1), 12.75],
  [new CalculateBaseAprDto(15000, 48, 599), 13.25],
  [new CalculateBaseAprDto(15000, 49, 399), undefined],

];

type UnhappyPathTuple = [CalculateBaseAprDto, typeof LoanAmmountExceedsYourLimit | typeof LoanAmmountTooLow]
const unhappyPathScenarios: UnhappyPathTuple[] = [
  [new CalculateBaseAprDto(4000, 36, 800), LoanAmmountTooLow],
  [new CalculateBaseAprDto(1000, 40, 600), LoanAmmountTooLow],
  [new CalculateBaseAprDto(7000, 52, 601), LoanAmmountTooLow],
  [new CalculateBaseAprDto(120000, 36, 800), LoanAmmountExceedsYourLimit],
  [new CalculateBaseAprDto(90000, 48, 650), LoanAmmountExceedsYourLimit],
  [new CalculateBaseAprDto(60000, 36, 430), LoanAmmountExceedsYourLimit],
];

describe('base-apr-calculator', () => {
  describe('validate based on asset loan rules', () => {
    test.each(happyPathScenarios)('given %p request, must return %p correctly', (baseDto, expectedResult) => {
      expect(validateBaseAprCalculation(baseLoanRules, baseDto).baseValue).toBe(expectedResult);
    });

    test.each(unhappyPathScenarios)('given %p request, must throw exception %p', (baseDto, expectedException) => {
      expect(() => validateBaseAprCalculation(baseLoanRules, baseDto)).toThrowError(expectedException);
    });
  });

  describe('loan rule table with errors should throw exception', () => {
    const brokeRuleTable =  [
      new PersonScoreRange(undefined, 600, 50000, [
        TimeRangeUpTo36(12.75),
      ]),
    ];
    it('Credit score with a value missed in rules', ()=>{
      const dto = new CalculateBaseAprDto(15000, 36, 800)
      expect(() => validateBaseAprCalculation(brokeRuleTable, dto)).toThrowError(PersonCreditScoreNotSupported);
    })
    it('Loan termin with a value missed in rules', ()=>{
      const dto = new CalculateBaseAprDto(4000, 40, 400)
      expect(() => validateBaseAprCalculation(brokeRuleTable, dto)).toThrowError(LoanTermNotSupported);
    })
  });
});
