import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlanEntity {
  @ApiProperty({ example: 'p123-plan-id' })
  id: string;

  @ApiProperty({ example: 'Plano Pro' })
  name: string;

  @ApiPropertyOptional({ example: 'Plano completo com gestão de usuários, orçamentos e dispositivos.' })
  description?: string;

  @ApiProperty({ example: 149.90 })
  month: number;

  @ApiProperty({ example: 1490.00 })
  biannual: number;

  @ApiProperty({ example: 1490.00 })
  annual: number;

  @ApiPropertyOptional({ example: 500, description: 'Null para ilimitado' })
  maxUsers?: number;

  @ApiPropertyOptional({ example: 30, description: 'Null para ilimitado' })
  maxBudgetsMonth?: number;

  @ApiPropertyOptional({ example: 3, description: 'Quantidade de dispositivos permitidos' })
  maxDevices?: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<PlanEntity>) {
    Object.assign(this, partial);
  }

  isFree(): boolean {
    return Number(this.month) === 0 && Number(this.month) === 0;
  }
}