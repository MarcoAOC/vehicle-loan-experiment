import { Controller, Get, Inject, Query } from '@nestjs/common';
import { CalculateVehicleAprRequest } from './dtos/calculate-vehicle-apr.dto';
import calculateVehicleAprRequestToDto from './converters/calculate-vehicle-apr.converter';
import { ILoanService } from './interfaces/loan.service.interface';

@Controller('loan')
export class LoanController {
  constructor(@Inject(ILoanService) private readonly loanService: ILoanService) {}

  @Get('vehicle-apr')
  calculateVehicleAPR(@Query() request: CalculateVehicleAprRequest): string {
    const vehicleApr = this.loanService.calculateVehicleApr(
      calculateVehicleAprRequestToDto(request),
    );

    return vehicleApr ? `${vehicleApr}%` : 'Not available';
  }
}
