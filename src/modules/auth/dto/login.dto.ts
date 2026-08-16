import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joao.silva@email.com ou 12345678900',
    description: 'Informe o E-mail, CPF ou Nome de Usuário para realizar o login',
  })
  @IsString()
  @IsNotEmpty({ message: 'O identificador (E-mail, CPF ou Nome de Usuário) é obrigatório.' })
  identifier: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha de acesso cadastrada na plataforma',
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve possuir no mínimo 6 caracteres.' })
  password: string;

  @ApiProperty({
    example: 'comp-hash-xyz',
    description: 'Hash da empresa para autenticação via username no app móvel',
    required: false,
  })
  @IsString()
  @IsOptional()
  companyHash?: string;
}