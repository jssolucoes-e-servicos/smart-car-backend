// src/common/decorators/routes/church-route.decorator.ts

import { applyDecorators, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiSecurity, ApiResponse } from '@nestjs/swagger';
import { ChurchContextGuard, PermissionsGuard } from 'src/common/guards';
import { RequirePermission, RequireControl, ProtectedRoute } from 'src/common/decorators';
import { IChurchRouteOptions } from 'src/common/interfaces';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function ChurchRoute(method: HttpMethod, path?: string, options?: IChurchRouteOptions) {
  const decorators = [
    ProtectedRoute(method, path, options),
    UseGuards(ChurchContextGuard, PermissionsGuard),
    ApiSecurity('ChurchID'),
    ApiHeader({
      name: 'x-church-id',
      description: 'ID da Igreja Ativa para o contexto de acesso',
      required: true,
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Acesso Negado - Sem permissão para esta igreja',
    }),
  ];

  if (options?.permission) {
    decorators.push(RequirePermission(options.permission));
  }

  if (options?.controlCode) {
    decorators.push(RequireControl(options.controlCode));
  }

  return applyDecorators(...decorators);
}