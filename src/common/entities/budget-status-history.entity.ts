import { ApiProperty } from '@nestjs/swagger';

export class BudgetStatusHistoryEntity {
  @ApiProperty({ example: 'bsh-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 'bud-123' })
  budgetId: string;

  @ApiProperty({ example: 'PENDENT' })
  statusOld: string;

  @ApiProperty({ example: 'APPROVED' })
  status: string;

  @ApiProperty({ example: 'usr-123' })
  userId: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<BudgetStatusHistoryEntity>) {
    Object.assign(this, partial);
  }
}
