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
    // Permite login informando E-mail (o modelo User do SmartCar não tem CPF)
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.identifier,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais de acesso inválidas.');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyId: user.companyId,
      },
    };
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        company: {
          select: {
            id: true,
            name: true,
            fantasy: true,
            logo: true,
          },
        },
      },
    });
  }
}