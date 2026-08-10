import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreatePlanCompanyDto } from '../dto/create-plan-company.dto';
import { UpdatePlanCompanyDto } from '../dto/update-plan-company.dto';
import { PlanCompanyEntity } from 'src/common/entities';

@Injectable()
export class PlanCompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanCompanyDto): Promise<PlanCompanyEntity> {
    const existing = await this.prisma.planCompany.findFirst({
      where: { companyId: dto.companyId, active: true },
    });
    if (existing) {
      throw new ConflictException(`Esta empresa já possui um plano ativo vinculado.`);
    }

    // Calcular expiração se for Trial (ex: 15 dias de teste padrão)
    let expiresAt: Date | null = null;
    if (dto.isTrial) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 15);
    }

    const planCompany = await this.prisma.planCompany.create({
      data: {
        companyId: dto.companyId,
        planId: dto.planId,
        isTrial: dto.isTrial ?? false,
        expiresAt,
        expired: false,
        paymentFrequency: dto.paymentFrequency || 'MONTHLY',
        dueDate: dto.dueDate ?? 15,
        paymentMethod: dto.paymentMethod || 'PIX',
      },
    });

    return new PlanCompanyEntity(planCompany as unknown as Partial<PlanCompanyEntity>);
  }

  async findByCompanyId(companyId: string): Promise<PlanCompanyEntity> {
    const planCompany = await this.prisma.planCompany.findFirst({
      where: { companyId, active: true, deletedAt: null },
    });

    if (!planCompany) {
      throw new NotFoundException(`Nenhum plano ativo foi localizado para a empresa de ID '${companyId}'.`);
    }

    return new PlanCompanyEntity(planCompany as unknown as Partial<PlanCompanyEntity>);
  }

  async findById(id: string): Promise<PlanCompanyEntity> {
    const planCompany = await this.prisma.planCompany.findFirst({
      where: { id, deletedAt: null },
    });

    if (!planCompany) {
      throw new NotFoundException(`Registro de plano de empresa com ID '${id}' não foi localizado.`);
    }

    return new PlanCompanyEntity(planCompany as unknown as Partial<PlanCompanyEntity>);
  }

  async update(id: string, dto: UpdatePlanCompanyDto): Promise<PlanCompanyEntity> {
    await this.findById(id);

    const updated = await this.prisma.planCompany.update({
      where: { id },
      data: dto,
    });

    return new PlanCompanyEntity(updated as unknown as Partial<PlanCompanyEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.planCompany.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
