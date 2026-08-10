// src/common/validators/cpf.validator.ts

import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { CPFValidatorType } from 'src/common/types';
import { IsCpfConstraint } from './constraints/is-cpf.constraint';

export function CPFValidator({
  fieldName,
  label = 'CPF',
  optional = false,
  description = 'CPF sem pontos ou traço (11 dígitos válidos)',
  exemple = '12345678900',
}: CPFValidatorType) {
  if (label === undefined) label = fieldName;
  if (description === undefined) description = label;

  const decorators = [
    IsString({ message: `Campo ${label} deve ser texto` }),
    Validate(IsCpfConstraint, {
      message: `Campo ${label} é um número de CPF inválido.`,
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