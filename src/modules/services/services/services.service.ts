import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceEntity } from 'src/common/entities';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly countersService: CountersService,
  ) {}

  async create(dto: CreateServiceDto): Promise<ServiceEntity> {
    // Obter o sequencial único do serviço para a oficina usando o CountersService
    const nextCode = await this.countersService.increment(dto.companyId, 'service');

    const service = await this.prisma.service.create({
      data: {
        companyId: dto.companyId,
        code: nextCode,
        name: dto.name,
        description: dto.description || '',
        value: dto.value,
      },
    });

    return new ServiceEntity(service as unknown as Partial<ServiceEntity>);
  }

  async findAllByCompany(companyId: string): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany({
      where: { companyId, active: true, deletedAt: null },
      orderBy: { code: 'asc' },
    });

    return services.map((s) => new ServiceEntity(s as unknown as Partial<ServiceEntity>));
  }

  async findById(id: string): Promise<ServiceEntity> {
    const service = await this.prisma.service.findFirst({
      where: { id, deletedAt: null },
    });

    if (!service) {
      throw new NotFoundException(`Serviço de ID '${id}' não foi localizado.`);
    }

    return new ServiceEntity(service as unknown as Partial<ServiceEntity>);
  }

  async update(id: string, dto: UpdateServiceDto): Promise<ServiceEntity> {
    await this.findById(id);

    const updated = await this.prisma.service.update({
      where: { id },
      data: dto,
    });

    return new ServiceEntity(updated as unknown as Partial<ServiceEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.service.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
