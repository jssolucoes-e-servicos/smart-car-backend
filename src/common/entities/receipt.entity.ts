import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReceiptEntity {
  @ApiProperty({ example: 'rec-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 102 })
  code: number;

  @ApiPropertyOptional({ example: 'bud-123' })
  budgetId?: string;

  @ApiProperty({ example: 'Carlos Silva' })
  recipientName: string;

  @ApiProperty({ example: '12345678909' })
  document: string;

  @ApiProperty({ example: 'IN' })
  receiptType: string;

  @ApiProperty({ example: 'Duzentos e cinquenta reais' })
  valueExtense: string;

  @ApiProperty({ example: 'Recebimento de parcela de orçamento' })
  description: string;

  @ApiProperty({ example: false })
  reverse: boolean;

  @ApiProperty({ example: 'CARD_CREDIT' })
  paymentMethod: string;

  @ApiProperty({ example: 250.00 })
  value: number;

  @ApiProperty({ example: 'usr-123' })
  userId: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ReceiptEntity>) {
    Object.assign(this, partial);
  }
}
