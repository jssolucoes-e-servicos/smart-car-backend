import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from 'src/common/entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly countersService: CountersService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    if (dto.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });
      if (existingEmail) {
        throw new ConflictException(`Já existe um usuário cadastrado com o e-mail '${dto.email}'.`);
      }
    }

    const existingUsername = await this.prisma.user.findFirst({
      where: { companyId: dto.companyId, username: dto.username },
    });
    if (existingUsername) {
      throw new ConflictException(`Já existe um usuário cadastrado com o login '${dto.username}' nesta oficina.`);
    }

    // Gerar código único e sequencial para a empresa usando CountersService
    const nextCode = await this.countersService.increment(dto.companyId, 'user');
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        companyId: dto.companyId,
        code: nextCode,
        name: dto.name,
        email: dto.email || null,
        username: dto.username,
        password: hashedPassword,
      },
    });

    return new UserEntity(user as unknown as Partial<UserEntity>);
  }

  async findAllByCompany(companyId: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { companyId, active: true, deletedAt: null },
      orderBy: { code: 'asc' },
    });

    return users.map((u) => new UserEntity(u as unknown as Partial<UserEntity>));
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException(`Usuário de ID '${id}' não foi localizado.`);
    }

    return new UserEntity(user as unknown as Partial<UserEntity>);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await this.findById(id);

    if (dto.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (existingEmail) {
        throw new ConflictException(`O e-mail '${dto.email}' já está em uso por outro usuário.`);
      }
    }

    if (dto.username) {
      const existingUsername = await this.prisma.user.findFirst({
        where: { companyId: existingUser.companyId, username: dto.username, NOT: { id } },
      });
      if (existingUsername) {
        throw new ConflictException(`O login '${dto.username}' já está em uso nesta oficina.`);
      }
    }

    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 12);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
    });

    return new UserEntity(updated as unknown as Partial<UserEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.user.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
