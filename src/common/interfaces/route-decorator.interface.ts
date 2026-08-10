import { Type } from '@nestjs/common';
import { PermissionRequirements } from 'src/common/decorators/permissions.decorator';

export interface IBaseApiRouteOptions {
  summary: string;
  responseType?: Type<any> | [Type<any>];
  status?: number;
  description?: string;
}

export interface IChurchRouteOptions extends IBaseApiRouteOptions {
  permission?: PermissionRequirements;
  controlCode?: string;
}