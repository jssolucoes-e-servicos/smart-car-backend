// src/common/entities/user-role.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';

export class UserRoleEntity {
  @ApiProperty({ example: 'ur-123' })
  id: string;

  @ApiProperty({ example: 'link-12345' })
  personChurchId: string;

  @ApiProperty({ example: 'role-123' })
  roleId: string;

  @ApiPropertyOptional()
  expiresAt?: Date;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiPropertyOptional({ type: () => RoleEntity })
  role?: RoleEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserRoleEntity>) {
    Object.assign(this, partial);
  }

  isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }
}