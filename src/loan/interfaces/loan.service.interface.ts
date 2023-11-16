import { CalculateBaseAprDto } from "../dtos/calculate-base-apr.dto"
import { CalculateVehicleAprDto } from "../dtos/calculate-vehicle-apr.dto"
import { LoanAssetTypeEnum } from "../enum/loan.enum"

export interface ILoanService {
    calculateVehicleApr(dto: CalculateVehicleAprDto): number | undefined;
    
    calculateBaseApr(dto: CalculateBaseAprDto,loanAssetType: LoanAssetTypeEnum): number | undefined;
}

export const ILoanService = Symbol("ILoanService");