import { Injectable } from '@nestjs/common';
import { CalculateVehicleAprDto } from './dtos/calculate-vehicle-apr.dto';
import { calculateVehicleAprAdditions } from './domain-rules/calculate-vehicle-apr-additions';
import { CalculateBaseAprDto } from './dtos/calculate-base-apr.dto';
import calculateBaseApr from './domain-rules/base-apr-calculator';
import { LoanAssetTypeEnum } from './enum/loan.enum';

@Injectable()
export class LoanService {
  //Criar Interface para o serviço
  calculateVehicleApr(dto: CalculateVehicleAprDto): number | undefined {
    console.log('Chegou aqui no serviço', dto);
    const baseApr = this.calculateBaseApr(
      new CalculateBaseAprDto(
        dto.loanAmount,
        dto.loanTermInMonths,
        dto.personCreditScore,
      ),
      LoanAssetTypeEnum.VEHICLE,
    );
    if (baseApr == undefined) return undefined;

    console.log('Calculo base', baseApr);
    const vehicleAdditions = calculateVehicleAprAdditions(dto);
    console.log('Adição baseado no asset', vehicleAdditions);

    return baseApr + vehicleAdditions;
  }

  private calculateBaseApr(
    dto: CalculateBaseAprDto,
    loanAssetType: LoanAssetTypeEnum,
  ): number | undefined {
    return calculateBaseApr(dto, loanAssetType);
  }
}
