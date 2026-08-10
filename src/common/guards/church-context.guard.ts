import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChurchContextGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtido através do JwtAuthGuard

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado.');
    }

    const companyId =
      request.headers['x-church-id'] ||
      request.headers['x-company-id'] ||
      request.cookies?.['x-company-id'];

    if (!companyId) {
      throw new BadRequestException(
        'Header "x-company-id" ou "x-church-id" é obrigatório para esta operação.',
      );
    }

    // Valida no PostgreSQL se o usuário pertence à empresa informada e se ambos estão ativos
    const dbUser = await this.prisma.user.findFirst({
      where: {
        id: user.sub,
        companyId: companyId,
        active: true,
        company: { active: true },
      },
      include: {
        company: true,
      },
    });

    if (!dbUser) {
      throw new ForbiddenException(
        'Acesso negado: Você não possui vínculo ativo com esta empresa/oficina.',
      );
    }

    // Anexa os dados do usuário e empresa para o fluxo e controle de permissões subsequentes
    request.personChurch = {
      ...dbUser,
      // Mapeamento retrocompatível para evitar quebrar guards legados como o PermissionsGuard
      church: dbUser.company,
      permissions: [],
      userRoles: [],
    };

    return true;
  }
}
export { ChurchContextGuard as CompanyContextGuard };