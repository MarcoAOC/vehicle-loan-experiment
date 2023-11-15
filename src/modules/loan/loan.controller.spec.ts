import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

describe('LoanController', () => {
  let loanController: LoanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [LoanService],
    }).compile();

    loanController = app.get<LoanController>(LoanController);
  });
});
