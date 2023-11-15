export class CalculateVehicleAprDto {
  loanAmount: number;
  loanTerm: number;
  personCreditScore: number;
  vehicleYear: number;
  vehicleMileage: number;
}

export class CalculateVehicleAprRequest {
  loanAmount: string;
  loanTerm: string;
  personCreditScore: string;
  vehicleYear: string;
  vehicleMileage: string;
}
