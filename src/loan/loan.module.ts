import { Module } from '@nestjs/common';
import { ILoanService } from './interfaces/loan.service.interface';
import { LoanController } from './loan.controller';
import { LoanServiceImpl } from './loan.service';

@Module({
  imports: [],
  controllers: [LoanController],
  providers: [{provide: ILoanService, useClass: LoanServiceImpl}],
})
export class LoanModule {}
