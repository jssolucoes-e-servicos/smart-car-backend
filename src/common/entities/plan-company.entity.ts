import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlanCompanyEntity {
  @ApiProperty({ example: 'pc-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 'plan-123' })
  planId: string;

  @ApiProperty({ example: false })
  isTrial: boolean;

  @ApiPropertyOptional()
  expiresAt?: Date;

  @ApiProperty({ example: false })
  expired: boolean;

  @ApiProperty({ example: 'MONTHLY' })
  paymentFrequency: string;

  @ApiProperty({ example: 15 })
  dueDate: number;

  @ApiProperty({ example: 'PIX' })
  paymentMethod: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<PlanCompanyEntity>) {
    Object.assign(this, partial);
  }
}
