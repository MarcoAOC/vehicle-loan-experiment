import { Controller, Get, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CalculateVehicleAprRequest } from './dtos/calculate-vehicle-apr.dto';
import calculateVehicleAprRequestToDto from './converters/calculate-vehicle-apr.converter';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('apr') //Realmente essa chamdaa é idempotente ou a tabela base de apr pode variar com o tempo?
  calculateAPR(@Query() request: CalculateVehicleAprRequest): string {
    //Colocar log aqui
    console.log('Chegou aqui controller', request);
    const vehicleApr = this.loanService.calculateVehicleApr(
      calculateVehicleAprRequestToDto(request),
    );

    return `${vehicleApr}%`;
  }
}
