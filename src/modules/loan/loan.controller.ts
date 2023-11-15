import { Controller, Get, Param, ParseFloatPipe, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import {
  CalculateVehicleAprDto,
  CalculateVehicleAprRequest,
} from './dtos/calculate-vehicle-apr.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('apr')
  calculateAPR(@Query() request: CalculateVehicleAprRequest): string {
    console.log(request);
    return this.loanService.calculateApr();
  }
}
