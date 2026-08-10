import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyInvoiceEntity {
  @ApiProperty({ example: 'inv-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 'plan-123' })
  planId: string;

  @ApiProperty({ example: '2026-08' })
  reference: string;

  @ApiProperty({ example: 149.90 })
  amount: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiPropertyOptional()
  paidAt?: Date;

  @ApiPropertyOptional({ example: 'ext-invoice-123' })
  externalId?: string;

  @ApiPropertyOptional({ example: '{}' })
  externalMeta?: string;

  @ApiPropertyOptional({ example: 'MercadoPago' })
  providerName?: string;

  @ApiProperty({ example: 'PIX' })
  paymentMethod: string;

  @ApiProperty({ example: 'PENDING' })
  invoiceStatus: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CompanyInvoiceEntity>) {
    Object.assign(this, partial);
  }
}
