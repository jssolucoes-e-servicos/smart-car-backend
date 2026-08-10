import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BudgetItemEntity {
  @ApiProperty({ example: 'bi-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 'bud-123' })
  budgetId: string;

  @ApiProperty({ example: 'Troca de Óleo' })
  serviceName: string;

  @ApiProperty({ example: 150.00 })
  serviceValue: number;

  @ApiProperty({ example: 180.00 })
  suggestValue: number;

  @ApiPropertyOptional({ example: 'srv-123' })
  referenceId?: string;

  @ApiProperty({ example: 'Pastilha de Freio Cobreq' })
  name: string;

  @ApiProperty({ example: 120.00 })
  value: number;

  @ApiProperty({ example: false })
  removed: boolean;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<BudgetItemEntity>) {
    Object.assign(this, partial);
  }
}
