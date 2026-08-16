import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BudgetItemEntity } from './budget-item.entity';
import { BudgetPaymentEntity } from './budget-payment.entity';

export class BudgetEntity {
  @ApiProperty({ example: 'bud-123' })
  id: string;

  @ApiProperty({ example: 'comp-123' })
  companyId: string;

  @ApiProperty({ example: 45 })
  code: number;

  @ApiProperty({ example: 'Carlos Silva' })
  customerName: string;

  @ApiProperty({ example: '12345678909' })
  document: string;

  @ApiProperty({ example: '51999999999' })
  phone: string;

  @ApiProperty({ example: 'carlos@gmail.com' })
  email: string;

  @ApiProperty({ example: '90000000' })
  zipCode: string;

  @ApiProperty({ example: 'Av Protásio Alves' })
  publicPlace: string;

  @ApiProperty({ example: '450' })
  number: string;

  @ApiProperty({ example: 'Apto 302' })
  complement: string;

  @ApiProperty({ example: 'Petrópolis' })
  neighborhood: string;

  @ApiProperty({ example: 'Porto Alegre' })
  city: string;

  @ApiProperty({ example: 'Chevrolet' })
  brand: string;

  @ApiProperty({ example: 'Onix' })
  model: string;

  @ApiProperty({ example: 'IXO9B88' })
  plate: string;

  @ApiProperty({ example: '2020' })
  year: string;

  @ApiProperty({ example: '45000' })
  km: string;

  @ApiProperty({ example: 'Revisão geral de 40k km' })
  description: string;

  @ApiProperty({ example: 450.00 })
  totalValue: number;

  @ApiProperty({ example: 'PENDENT' })
  status: string;

  @ApiProperty({ example: false })
  approved: boolean;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: [BudgetItemEntity] })
  items?: BudgetItemEntity[];

  @ApiPropertyOptional({ type: [BudgetPaymentEntity] })
  payments?: BudgetPaymentEntity[];

  constructor(partial: Partial<BudgetEntity>) {
    Object.assign(this, partial);
  }
}
