import { ApiProperty } from '@nestjs/swagger';
import { CalculateBaseAprDto } from './calculate-base-apr.dto';

export class CalculateVehicleAprDto extends CalculateBaseAprDto {
  vehicleYear: number;
  vehicleMileage: number;

  constructor(
    loanAmount: number,
    loanTermInMonths: number,
    personCreditScore: number,
    vehicleYear: number,
    vehicleMileage: number,
  ) {
    super(loanAmount, loanTermInMonths, personCreditScore);
    this.vehicleYear = vehicleYear;
    this.vehicleMileage = vehicleMileage;
  }
}

export class CalculateVehicleAprRequest {
  @ApiProperty({
    example: '10000',
    description: 'The loan amount that person wants, must be a number > 0',
  })
  loanAmount: string;

  @ApiProperty({
    example: '36',
    description: 'The loan term in months, must be a number > 0'
  })
  loanTermInMonths: string;

  @ApiProperty({
    example: '700',
    description: 'Credit score for the person, must be a number > 0'
  })
  personCreditScore: string;

  @ApiProperty({
    example: '2014',
    description: 'The vehicle year, must be a number > 0'
  })
  vehicleYear: string;

  @ApiProperty({
    example: '50000',
    description: 'The vehicle mileage, must be a number > 0'
  })
  vehicleMileage: string;

  constructor(
    loanAmount: string,
    loanTermInMonths: string,
    personCreditScore: string,
    vehicleYear: string,
    vehicleMileage: string,
  ) {
    this.loanAmount = loanAmount;
    this.loanTermInMonths = loanTermInMonths;
    this.personCreditScore = personCreditScore;
    this.vehicleYear = vehicleYear;
    this.vehicleMileage = vehicleMileage;
  }
}
