import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { CNPJValidatorType } from 'src/common/types';
import { IsCnpjConstraint } from './constraints/is-cnpj.constraint';

export function CNPJValidator({
  fieldName,
  label = 'CNPJ',
  optional = false,
  description = 'CNPJ da Igreja/Empresa (aceita formato numérico ou alfanumérico)',
  exemple = '12345678000195 ou 12ABC345000135',
}: CNPJValidatorType) {
  if (label === undefined) label = fieldName;
  if (description === undefined) description = label;

  const decorators = [
    IsString({ message: `Campo ${label} deve ser texto` }),
    Validate(IsCnpjConstraint, {
      message: `Campo ${label} é um número de CNPJ inválido.`,
    }),
  ];

  if (optional) {
    return applyDecorators(
      ...decorators,
      IsOptional(),
      ApiPropertyOptional({ name: fieldName, description, example: exemple }),
    );
  }

  return applyDecorators(
    ...decorators,
    IsNotEmpty({ message: `Campo ${label} é requerido` }),
    ApiProperty({ name: fieldName, description, example: exemple }),
  );
}