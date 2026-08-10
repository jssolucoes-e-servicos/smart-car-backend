import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionStatusEnum } from 'src/common/enums';
import { PlanEntity } from './plan.entity';
import { CompanyEntity } from './company.entity';


export class SubscriptionEntity {
  @ApiProperty({ example: 'sub-123456' })
  id: string;

  @ApiProperty({ example: 'church-123' })
  churchId: string;

  @ApiProperty({ example: 'plan-123' })
  planId: string;

  @ApiProperty({ enum: SubscriptionStatusEnum, example: SubscriptionStatusEnum.TRIALING })
  status: SubscriptionStatusEnum;

  @ApiPropertyOptional()
  trialEndsAt?: Date;

  @ApiProperty()
  currentPeriodStartsAt: Date;

  @ApiProperty()
  currentPeriodEndsAt: Date;

  @ApiPropertyOptional({ example: 'sub_gateway_abc123' })
  gatewaySubscriptionId?: string;

  @ApiPropertyOptional({ example: 'cus_gateway_xyz789' })
  gatewayCustomerId?: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiPropertyOptional({ type: () => PlanEntity })
  plan?: PlanEntity;

  @ApiPropertyOptional({ type: () => CompanyEntity })
  church?: CompanyEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<SubscriptionEntity>) {
    Object.assign(this, partial);
  }

  isValid(): boolean {
    if (!this.active) return false;
    if (this.status === SubscriptionStatusEnum.CANCELED || this.status === SubscriptionStatusEnum.UNPAID) {
      return false;
    }
    return new Date() <= this.currentPeriodEndsAt || (this.trialEndsAt ? new Date() <= this.trialEndsAt : false);
  }
}