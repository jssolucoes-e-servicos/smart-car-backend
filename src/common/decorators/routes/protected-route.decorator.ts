import { applyDecorators, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IBaseApiRouteOptions } from 'src/common/interfaces/route-decorator.interface';
import { PublicRoute } from './public-route.decorator';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function ProtectedRoute(method: HttpMethod, path?: string, options?: IBaseApiRouteOptions) {
  return applyDecorators(
    PublicRoute(method, path, options),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('JWT'),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado - Token ausente ou inválido' }),
  );
}