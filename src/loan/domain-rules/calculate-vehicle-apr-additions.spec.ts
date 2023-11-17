import { CalculateVehicleAprDto } from '../dtos/calculate-vehicle-apr.dto';
import { calculateVehicleAprAdditions } from './calculate-vehicle-apr-additions';

describe('calculateVehicleAprAdditions', () => {
  const vehicleDto = new CalculateVehicleAprDto(15000, 36, 600, 2023, 1000);

  it('should return 1.0 when vehicleYear is less than 2015', () => {
    const replaceDtoValues = { vehicleYear: 2014, vehicleMileage: 50000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(
      1.0,
    );
  });

  it('should return 0 when vehicleYear is equal to 2015', () => {
    const replaceDtoValues = { vehicleYear: 2015, vehicleMileage: 50000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(0);
  });

  it('should return 2.0 when vehicleMileage is greater than 100000', () => {
    const replaceDtoValues = { vehicleYear: 2016, vehicleMileage: 110000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(
      2.0,
    );
  });

  it('should return 0 when vehicleMileage is equal to 100000', () => {
    const replaceDtoValues = { vehicleYear: 2016, vehicleMileage: 100000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(0);
  });

  it('should return 1.0 when both vehicleYear is less than 2015 and vehicleMileage is greater than 100000', () => {
    const replaceDtoValues = { vehicleYear: 2014, vehicleMileage: 110000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(
      1.0,
    );
  });

  it('should return 0 when both vehicleYear is greater than or equal to 2015 and vehicleMileage is less than or equal to 100000', () => {
    const replaceDtoValues = { vehicleYear: 2016, vehicleMileage: 90000 };
    expect(calculateVehicleAprAdditions({ ...vehicleDto, ...replaceDtoValues })).toBe(0);
  });
});
