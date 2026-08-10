import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'required_permission';
export const CONTROL_KEY = 'required_control';

export interface PermissionRequirements {
  module: string;
  action: 'access' | 'create' | 'update' | 'delete' | 'report' | 'canApprove';
}

export const RequirePermission = (requirements: PermissionRequirements) =>
  SetMetadata(PERMISSION_KEY, requirements);

export const RequireControl = (controlCode: string) =>
  SetMetadata(CONTROL_KEY, controlCode);