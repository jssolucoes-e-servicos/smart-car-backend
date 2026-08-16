import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanySettingEntity {
  @ApiProperty({ example: 'setting-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: '#ff0000' })
  themeColor: string;

  @ApiPropertyOptional({ example: 'mp-key-123' })
  mercadoPagoKey?: string;

  @ApiPropertyOptional({ example: 'mp-token-123' })
  mercadoPagoToken?: string;

  @ApiProperty({ example: 'TEST' })
  mercadoPagoMode: string;

  @ApiPropertyOptional({ example: 'mp@smartcar.com' })
  mercadoPagoEmail?: string;

  @ApiPropertyOptional({ example: 'pix-key-123' })
  pixKey?: string;

  @ApiProperty({ example: false })
  usingEmail: boolean;

  @ApiPropertyOptional({ example: 'smtp.smartcar.com' })
  emailHost?: string;

  @ApiPropertyOptional({ example: 'smtp@smartcar.com' })
  emailUser?: string;

  @ApiPropertyOptional({ example: 'smtp-password' })
  emailPassword?: string;

  @ApiPropertyOptional({ example: 587 })
  emailPort?: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CompanySettingEntity>) {
    Object.assign(this, partial);
  }
}
