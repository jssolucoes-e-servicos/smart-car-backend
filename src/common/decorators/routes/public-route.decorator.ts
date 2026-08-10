import { applyDecorators, Get, Post, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IBaseApiRouteOptions } from 'src/common/interfaces/route-decorator.interface';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function getHttpDecorator(method: HttpMethod, path?: string) {
  switch (method) {
    case 'GET': return Get(path);
    case 'POST': return Post(path);
    case 'PUT': return Put(path);
    case 'PATCH': return Patch(path);
    case 'DELETE': return Delete(path);
  }
}

export function PublicRoute(method: HttpMethod, path?: string, options?: IBaseApiRouteOptions) {
  const status = options?.status ?? (method === 'POST' ? HttpStatus.CREATED : method === 'DELETE' ? HttpStatus.NO_CONTENT : HttpStatus.OK);

  const decorators = [
    getHttpDecorator(method, path),
    HttpCode(status),
    ApiOperation({ summary: options?.summary || '' }),
  ];

  if (options?.responseType) {
    decorators.push(ApiResponse({ status, type: options.responseType, description: options.description }));
  }

  return applyDecorators(...decorators);
}