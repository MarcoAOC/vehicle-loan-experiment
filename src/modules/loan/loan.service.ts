import { Injectable } from '@nestjs/common';

@Injectable()
export class LoanService {
  calculateApr(): string {
    return 'Test';
  }
}
