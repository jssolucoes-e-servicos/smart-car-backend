import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { ManagerEntity } from 'src/common/entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateManagerDto): Promise<ManagerEntity> {
    const existingEmail = await this.prisma.manager.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new ConflictException(`Já existe um gerente cadastrado com o e-mail '${dto.email}'.`);
    }

    const existingName = await this.prisma.manager.findUnique({
      where: { name: dto.name },
    });
    if (existingName) {
      throw new ConflictException(`Já existe um gerente cadastrado com o nome '${dto.name}'.`);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const manager = await this.prisma.manager.create({
      data: {
        name: dto.name,
        cpf: dto.cpf,
        phone: dto.phone,
        email: dto.email,
        password: hashedPassword,
      },
    });

    return new ManagerEntity(manager as unknown as Partial<ManagerEntity>);
  }

  async findAllActive(): Promise<ManagerEntity[]> {
    const managers = await this.prisma.manager.findMany({
      where: { active: true, deletedAt: null },
      orderBy: { name: 'asc' },
    });

    return managers.map((m) => new ManagerEntity(m as unknown as Partial<ManagerEntity>));
  }

  async findById(id: string): Promise<ManagerEntity> {
    const manager = await this.prisma.manager.findFirst({
      where: { id, deletedAt: null },
    });

    if (!manager) {
      throw new NotFoundException(`Gerente com ID '${id}' não foi localizado.`);
    }

    return new ManagerEntity(manager as unknown as Partial<ManagerEntity>);
  }

  async update(id: string, dto: UpdateManagerDto): Promise<ManagerEntity> {
    await this.findById(id);

    if (dto.email) {
      const existingEmail = await this.prisma.manager.findFirst({
        where: { email: dto.email, NOT: { id } },
      });
      if (existingEmail) {
        throw new ConflictException(`O e-mail '${dto.email}' já está em uso por outro gerente.`);
      }
    }

    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 12);
    }

    const updated = await this.prisma.manager.update({
      where: { id },
      data,
    });

    return new ManagerEntity(updated as unknown as Partial<ManagerEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.manager.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
