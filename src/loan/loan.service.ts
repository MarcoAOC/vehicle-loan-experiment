import { Injectable } from '@nestjs/common';
import { CalculateVehicleAprDto } from './dtos/calculate-vehicle-apr.dto';
import { calculateVehicleAprAdditions } from './domain-rules/calculate-vehicle-apr-additions';
import { CalculateBaseAprDto } from './dtos/calculate-base-apr.dto';
import calculateBaseApr from './domain-rules/base-apr-calculator';
import { LoanAssetTypeEnum } from './enum/loan.enum';
import { ILoanService } from './interfaces/loan.service.interface';

@Injectable()
export class LoanServiceImpl implements ILoanService {
  calculateVehicleApr(dto: CalculateVehicleAprDto): number | undefined {
    const baseApr = this.calculateBaseApr(
      new CalculateBaseAprDto(
        dto.loanAmount,
        dto.loanTermInMonths,
        dto.personCreditScore,
      ),
      LoanAssetTypeEnum.VEHICLE,
    );
    if (baseApr === undefined) return undefined;

    const vehicleAdditions = calculateVehicleAprAdditions(dto);

    return baseApr + vehicleAdditions;
  }

  calculateBaseApr(
    dto: CalculateBaseAprDto,
    loanAssetType: LoanAssetTypeEnum,
  ): number | undefined {
    return calculateBaseApr(dto, loanAssetType);
  }
}
