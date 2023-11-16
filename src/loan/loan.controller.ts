import { Controller, Get, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CalculateVehicleAprRequest } from './dtos/calculate-vehicle-apr.dto';
import calculateVehicleAprRequestToDto from './converters/calculate-vehicle-apr.converter';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('vehicle-apr')
  calculateVehicleAPR(@Query() request: CalculateVehicleAprRequest): string {
    const vehicleApr = this.loanService.calculateVehicleApr(
      calculateVehicleAprRequestToDto(request),
    );

    return vehicleApr ? `${vehicleApr}%` : 'Not available';
  }
}
