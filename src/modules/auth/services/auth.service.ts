import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    let user: any = null;

    if (dto.companyHash) {
      // Busca a empresa pelo hash vinculado ao dispositivo
      const company = await this.prisma.company.findFirst({
        where: { hash: dto.companyHash, active: true, deletedAt: null },
      });

      if (!company) {
        throw new UnauthorizedException('Oficina associada a este dispositivo inválida ou inativa.');
      }

      // Busca o usuário correspondente à oficina usando o username
      user = await this.prisma.user.findFirst({
        where: {
          companyId: company.id,
          username: dto.identifier,
          deletedAt: null,
        },
        include: {
          company: {
            select: {
              hash: true,
              name: true,
              fantasy: true,
              logo: true,
            },
          },
        },
      });
    } else {
      // Login tradicional via E-mail
      user = await this.prisma.user.findFirst({
        where: {
          email: dto.identifier,
          deletedAt: null,
        },
        include: {
          company: {
            select: {
              hash: true,
              name: true,
              fantasy: true,
              logo: true,
            },
          },
        },
      });
    }

    if (!user) {
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }

    const payload = { sub: user.id, email: user.email, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        companyId: user.companyId,
        companyHash: user.company?.hash,
        companyName: user.company?.fantasy || user.company?.name,
        role: user.role,
      },
    };
  }

  async loginManager(dto: LoginDto) {
    console.log('dto', dto);
    const manager = await this.prisma.manager.findFirst({
      where: {
        email: dto.identifier,
        deletedAt: null,
      },
    });

    if (!manager) {
      console.log('Não encontrou o gerente', dto);
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }
    console.log('Encontrou o gerente', manager);
    const isPasswordValid = await bcrypt.compare(dto.password, manager.password);
    if (!isPasswordValid) {
      console.log('Senha inválida', dto);
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }
    console.log('Senha válida', manager);
    const payload = { sub: manager.id, email: manager.email, isManager: true };

    return {
      accessToken: this.jwtService.sign(payload),
      manager: {
        id: manager.id,
        name: manager.name,
        email: manager.email,
      },
    };
  }

  async getMe(userId: string, isManager = false) {
    if (isManager) {
      return this.prisma.manager.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          active: true,
        },
      });
    }

    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        role: true,
        company: {
          select: {
            id: true,
            name: true,
            fantasy: true,
            logo: true,
            hash: true,
          },
        },
      },
    });
  }
}