import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServiceEntity {
  @ApiProperty({ example: 'srv-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 1 })
  code: number;

  @ApiProperty({ example: 'Troca de Óleo' })
  name: string;

  @ApiProperty({ example: 'Troca de óleo de motor e filtro' })
  description: string;

  @ApiProperty({ example: 150.00 })
  value: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ServiceEntity>) {
    Object.assign(this, partial);
  }
}
