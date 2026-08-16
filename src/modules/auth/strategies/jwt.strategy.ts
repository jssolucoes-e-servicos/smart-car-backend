import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'smartChurchesSecretKey',
    });
  }

  async validate(payload: { sub: string; email: string; isManager?: boolean }) {
    if (payload.isManager) {
      const manager = await this.prisma.manager.findFirst({
        where: { id: payload.sub, deletedAt: null },
      });

      if (!manager) {
        throw new UnauthorizedException('Acesso negado: Gerente não localizado ou inativo.');
      }

      return { sub: manager.id, email: manager.email, name: manager.name, isManager: true };
    }

    const user = await this.prisma.user.findFirst({
      where: { id: payload.sub, deletedAt: null },
    });

    if (!user) {
      throw new UnauthorizedException('Acesso negado: Usuário não localizado ou inativo.');
    }

    return { sub: user.id, email: user.email, name: user.name };
  }
}