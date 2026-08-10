import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joao.silva@email.com ou 12345678900',
    description: 'Informe o E-mail ou o CPF (apenas números) para realizar o login',
  })
  @IsString()
  @IsNotEmpty({ message: 'O identificador (E-mail ou CPF) é obrigatório.' })
  identifier: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha de acesso cadastrada na plataforma',
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve possuir no mínimo 6 caracteres.' })
  password: string;
}