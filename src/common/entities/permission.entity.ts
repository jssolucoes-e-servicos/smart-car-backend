// src/common/entities/permission.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ModuleEntity } from './module.entity';
export class PermissionEntity {
  @ApiProperty({ example: 'perm-123' })
  id: string;

  @ApiPropertyOptional({ example: 'link-123' })
  personChurchId?: string;

  @ApiPropertyOptional({ example: 'role-123' })
  roleId?: string;

  @ApiProperty({ example: 'mod-123' })
  moduleId: string;

  @ApiProperty({ example: true })
  access: boolean;

  @ApiProperty({ example: true })
  create: boolean;

  @ApiProperty({ example: true })
  update: boolean;

  @ApiProperty({ example: false })
  delete: boolean;

  @ApiProperty({ example: true })
  report: boolean;

  @ApiProperty({ example: true })
  canApprove: boolean;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiPropertyOptional({ type: () => ModuleEntity })
  module?: ModuleEntity;

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}