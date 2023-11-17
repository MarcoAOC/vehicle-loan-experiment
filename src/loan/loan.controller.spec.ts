import { Test, TestingModule } from '@nestjs/testing';
import { LoanServiceImpl } from './loan.service';
import { LoanController } from './loan.controller';
import { CalculateVehicleAprRequest } from './dtos/calculate-vehicle-apr.dto';
import { NegativeValueIsNotAllowedException } from 'src/common/exceptions/numbers.exception';
import { ILoanService } from './interfaces/loan.service.interface';

describe('LoanController', () => {
  let loanController: LoanController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [{ provide: ILoanService, useClass: LoanServiceImpl }],
    }).compile();

    loanController = app.get<LoanController>(LoanController);
  });

  describe('calculateVehicleAPR', () => {
    it('happy path of a calculation request', () => {
      const request = new CalculateVehicleAprRequest(
        '10000',
        '36',
        '700',
        '2014',
        '50000',
      );
      expect(loanController.calculateVehicleAPR(request)).toBe('5.75%');
    });
    it('happy path of a calculation request with undefined response', () => {
      const request = new CalculateVehicleAprRequest(
        '15000',
        '49',
        '399',
        '2014',
        '50000',
      );
      expect(loanController.calculateVehicleAPR(request)).toBe('Not available');
    });
    it('unhappy path of a calculation request', () => {
      const request = new CalculateVehicleAprRequest(
        '-10000',
        '36',
        '700',
        '2014',
        '50000',
      );
      expect(() => loanController.calculateVehicleAPR(request)).toThrowError(
        NegativeValueIsNotAllowedException,
      );
    });
  });
});
