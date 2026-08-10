// src/common/entities/permission.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class ModuleEntity {
  @ApiProperty({ example: 'mod-123' })
  id: string;

  @ApiProperty({ example: 'Células' })
  name: string;

  @ApiProperty({ example: 'celulas' })
  slug: string;

  @ApiProperty({ example: 'Gestão de redes e reuniões' })
  description: string;

  @ApiProperty({ example: 'CellsController' })
  ctrl: string;

  @ApiProperty({ example: '/celulas' })
  view: string;

  @ApiProperty({ example: true })
  active: boolean;

  constructor(partial: Partial<ModuleEntity>) {
    Object.assign(this, partial);
  }
}