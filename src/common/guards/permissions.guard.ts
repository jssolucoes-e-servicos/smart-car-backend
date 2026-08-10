import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY, CONTROL_KEY, PermissionRequirements } from 'src/common/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<PermissionRequirements>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredControl = this.reflector.getAllAndOverride<string>(
      CONTROL_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Se a rota não exige nenhuma permissão específica, libera o acesso
    if (!requiredPermission && !requiredControl) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const personChurch = request.personChurch;

    if (!personChurch) {
      throw new ForbiddenException('Contexto de congregação não carregado.');
    }

    // 1. Validação do Módulo & Ação
    if (requiredPermission) {
      const hasModulePermission = this.validateModulePermission(
        personChurch,
        requiredPermission.module,
        requiredPermission.action,
      );

      if (!hasModulePermission) {
        throw new ForbiddenException(
          `Sem permissão de ${requiredPermission.action} no módulo '${requiredPermission.module}'.`,
        );
      }
    }

    // 2. Validação do Controle Específico (Botão/Ação)
    if (requiredControl) {
      const hasControlPermission = this.validateControlPermission(
        personChurch,
        requiredControl,
      );

      if (!hasControlPermission) {
        throw new ForbiddenException(
          `Sem permissão para executar a ação controlada: '${requiredControl}'.`,
        );
      }
    }

    return true;
  }

  private validateModulePermission(personChurch: any, moduleSlug: string, action: string): boolean {
    // A) Checa se a pessoa tem permissão pontual direta no PersonChurch
    const directPerm = personChurch.permissions?.find((p: any) => p.module?.slug === moduleSlug && p.active);
    if (directPerm && directPerm[action] === true) return true;

    // B) Checa se alguma das Roles ativas da pessoa possui a permissão no módulo
    return personChurch.userRoles?.some((ur: any) => {
      const rolePerm = ur.role?.permissions?.find((p: any) => p.module?.slug === moduleSlug && p.active);
      return rolePerm && rolePerm[action] === true;
    });
  }

  private validateControlPermission(personChurch: any, controlCode: string): boolean {
    return personChurch.userRoles?.some((ur: any) => {
      const ctrlPerm = ur.role?.controlPermissions?.find(
        (cp: any) => cp.control?.code === controlCode && cp.active,
      );
      return ctrlPerm && ctrlPerm.granted === true;
    });
  }
}