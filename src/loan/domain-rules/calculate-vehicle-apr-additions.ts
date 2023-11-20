import { CalculateVehicleAprDto } from '../dtos/calculate-vehicle-apr.dto';

export function calculateVehicleAprAdditions(dto: CalculateVehicleAprDto): number {//Corrigir essa função auqi
  let addition = 0
  if (dto.vehicleYear < 2015) addition += 1.0;
  if (dto.vehicleMileage > 100000) addition += 2.0;
  return addition;
}
