import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerEntity {
  @ApiProperty({ example: 'mgr-123456' })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ example: '12345678909' })
  cpf: string;

  @ApiProperty({ example: '51999999999' })
  phone: string;

  @ApiProperty({ example: 'joao@smartcar.com' })
  email: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ManagerEntity>) {
    Object.assign(this, partial);
  }
}
