import {
  CalculateVehicleAprDto,
  CalculateVehicleAprRequest,
} from '../dtos/calculate-vehicle-apr.dto';

export default function calculateVehicleAprRequestToDto(
  request: CalculateVehicleAprRequest,
): CalculateVehicleAprDto {
  return new CalculateVehicleAprDto(
    Number(request.loanAmount),
    Number(request.loanTermInMonths),
    Number(request.personCreditScore),
    Number(request.vehicleYear),
    Number(request.vehicleMileage),
  );
}
