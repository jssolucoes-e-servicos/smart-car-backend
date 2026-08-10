import { ApiProperty } from '@nestjs/swagger';

export class CounterEntity {
  @ApiProperty({ example: 'cnt-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 10 })
  budget: number;

  @ApiProperty({ example: 5 })
  service: number;

  @ApiProperty({ example: 8 })
  receipt: number;

  @ApiProperty({ example: 3 })
  user: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CounterEntity>) {
    Object.assign(this, partial);
  }
}
