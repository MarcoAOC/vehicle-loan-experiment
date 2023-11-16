import { Test, TestingModule } from '@nestjs/testing';
import { CalculateVehicleAprDto } from './dtos/calculate-vehicle-apr.dto';
import { calculateVehicleAprAdditions } from './domain-rules/calculate-vehicle-apr-additions';
import { LoanService } from './loan.service';

jest.mock('./domain-rules/calculate-vehicle-apr-additions');

describe('LoanService', () => {
  let loanService: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
    }).compile();

    loanService = module.get<LoanService>(LoanService);
  });

  describe('calculateVehicleApr', () => {
    it('should sum vehicle additions with base APR correctly', () => {
      const dto: CalculateVehicleAprDto = {
        loanAmount: 10000,
        loanTermInMonths: 12,
        personCreditScore: 700,
        vehicleYear: 2016,
        vehicleMileage: 50000,
      };

      jest.spyOn(loanService, 'calculateBaseApr').mockReturnValue(5);

      (calculateVehicleAprAdditions as jest.Mock).mockReturnValue(1);

      const result = loanService.calculateVehicleApr(dto);

      expect(result).toBe(6);
    });

    it('should return undefined if base APR is undefined', () => {
      const dto: CalculateVehicleAprDto = {
        loanAmount: 10000,
        loanTermInMonths: 12,
        personCreditScore: 700,
        vehicleYear: 2016,
        vehicleMileage: 50000,
      };

      jest.spyOn(loanService, 'calculateBaseApr').mockReturnValue(undefined);

      const result = loanService.calculateVehicleApr(dto);

      expect(result).toBeUndefined();
    });
  });
});
