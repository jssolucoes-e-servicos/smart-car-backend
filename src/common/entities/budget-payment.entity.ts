import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BudgetPaymentEntity {
  @ApiProperty({ example: 'bp-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 'bud-123' })
  budgetId: string;

  @ApiProperty({ example: 250.00 })
  amount: number;

  @ApiProperty({ example: 'CARD_CREDIT' })
  method: string;

  @ApiPropertyOptional({ example: 'ext-payment-123' })
  externalId?: string;

  @ApiPropertyOptional({ example: '{}' })
  externalMeta?: string;

  @ApiProperty({ example: false })
  forCustomer: boolean;

  @ApiPropertyOptional({ example: 'usr-123' })
  userId?: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<BudgetPaymentEntity>) {
    Object.assign(this, partial);
  }
}
