export class CalculateBaseAprDto {
  loanAmount: number;
  loanTermInMonths: number;
  personCreditScore: number;

  constructor(
    loanAmount: number,
    loanTermInMonths: number,
    personCreditScore: number,
  ) {
    this.loanAmount = loanAmount;
    this.loanTermInMonths = loanTermInMonths;
    this.personCreditScore = personCreditScore;
  }
}
