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
  loanAmount: string;
  loanTermInMonths: string;
  personCreditScore: string;
  vehicleYear: string;
  vehicleMileage: string;
}
