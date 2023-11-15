import { CalculateVehicleAprDto } from '../dtos/calculate-vehicle-apr.dto';

//Talvez mudar essa pasta para domain-rules e separar por classe de ativo

export function calculateVehicleAprAdditions(
  dto: CalculateVehicleAprDto,
): number {
  if (dto.vehicleYear < 2015) return 1.0;
  if (dto.vehicleMileage > 1000) return 2.0;
  return 0;
}
