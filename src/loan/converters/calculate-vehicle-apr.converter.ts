import { castToFloat, castToInteger } from 'src/common/converters/numbers.converter';
import {
  CalculateVehicleAprDto,
  CalculateVehicleAprRequest,
} from '../dtos/calculate-vehicle-apr.dto';
import { NegativeValueIsNotAllowedException } from 'src/common/exceptions/numbers.exception';

function validateNegativeValue(value: number, fieldName: string) {
  if (value < 0) throw new NegativeValueIsNotAllowedException(fieldName, value);
}
export default function calculateVehicleAprRequestToDto(
  request: CalculateVehicleAprRequest,
): CalculateVehicleAprDto {
  const dto = new CalculateVehicleAprDto(
    castToFloat(request.loanAmount, 'loanAmount', [validateNegativeValue]),
    castToInteger(request.loanTermInMonths, 'loanTermInMonths', [validateNegativeValue]),
    castToInteger(request.personCreditScore, 'personCreditScore', [
      validateNegativeValue,
    ]),
    castToInteger(request.vehicleYear, 'vehicleYear', [validateNegativeValue]),
    castToInteger(request.vehicleMileage, 'vehicleMileage', [validateNegativeValue]),
  );

  return dto;
}
