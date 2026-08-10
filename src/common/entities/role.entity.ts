// src/common/entities/role.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleEntity {
  @ApiProperty({ example: 'role-123' })
  id: string;

  @ApiPropertyOptional({ example: 'church-123' })
  churchId?: string;

  @ApiProperty({ example: 'Líder de Célula' })
  name: string;

  @ApiPropertyOptional({ example: 'Acesso total de gestão à sua célula e membros' })
  description?: string;

  @ApiProperty({ example: ['CARD_CELL_SUMMARY', 'CARD_MEMBERS_COUNT'] })
  dashboardCards: string[];

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}