import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyEntity {
  @ApiProperty({ example: 'comp-123456' })
  id: string;

  @ApiProperty({ example: 'SmartCar Ltda' })
  name: string;

  @ApiProperty({ example: 'Oficina SmartCar' })
  fantasy: string;

  @ApiProperty({ example: '12345678000195' })
  cnpj: string;

  @ApiProperty({ example: 'ISENTO' })
  ie: string;

  @ApiProperty({ example: '51999999999' })
  phone: string;

  @ApiProperty({ example: 'contato@smartcar.com' })
  email: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  addressInLine: string;

  @ApiProperty({ example: '90000000' })
  zipCode: string;

  @ApiProperty({ example: 'Rua das Flores' })
  publicPlace: string;

  @ApiProperty({ example: '123' })
  number: string;

  @ApiProperty({ example: 'Sala A' })
  complement: string;

  @ApiProperty({ example: 'Centro' })
  neighborhood: string;

  @ApiProperty({ example: 'Porto Alegre' })
  city: string;

  @ApiProperty({ example: 'RS' })
  state: string;

  @ApiProperty({ example: 'https://smartcar.com/logo.png' })
  logo: string;

  @ApiProperty({ example: 'uuid-hash' })
  hash: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}

export { CompanyEntity as ChurchEntity };