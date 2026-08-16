import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: 'usr-12345' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 1 })
  code: number;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ example: 'joao.silva@email.com', required: false })
  email?: string;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    delete (this as any).password;
  }
}