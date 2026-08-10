import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreatePlanDto } from 'src/modules/plans/dto/create-plan.dto';
import { PlanEntity } from 'src/common/entities';
import { UpdatePlanDto } from '../dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreatePlanDto) {
    const existingPlan = await this.prisma.plan.findUnique({
      where: { name: dto.name },
    });

    if (existingPlan) {
      throw new ConflictException(`Já existe um plano cadastrado com o nome '${dto.name}'.`);
    }

    const plan = await this.prisma.plan.create({
      data: {
        name: dto.name,
        description: dto.description,
        month: dto.month,
        biannual: dto.biannual,
        annual: dto.annual,
        maxUsers: dto.maxUsers,
        maxBudgetsMonth: dto.maxBudgetsMonth,
        maxDevices: dto.maxDevices,
      },
    });

    return new PlanEntity(plan as unknown as Partial<PlanEntity>);
  }

  async findAllActive(): Promise<PlanEntity[]> {
    const plans = await this.prisma.plan.findMany({
      where: { active: true, deletedAt: null },
      orderBy: { month: 'asc' },
    });

    return plans.map(
      (plan) => new PlanEntity(plan as unknown as Partial<PlanEntity>),
    );
  }

  async findById(id: string): Promise<PlanEntity> {
    const plan = await this.prisma.plan.findFirst({
      where: { id, deletedAt: null },
    });

    if (!plan) {
      throw new NotFoundException(`Plano de ID '${id}' não foi localizado.`);
    }

    return new PlanEntity(plan as unknown as Partial<PlanEntity>);
  }

  async update(id: string, dto: UpdatePlanDto): Promise<PlanEntity> {
    await this.findById(id);

    if (dto.name) {
      const existingSlug = await this.prisma.plan.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (existingSlug) {
        throw new ConflictException(
          `O nome '${dto.name}' já está em uso por outro plano.`,
        );
      }
    }

    const updatedPlan = await this.prisma.plan.update({
      where: { id },
      data: dto,
    });

    return new PlanEntity(updatedPlan as unknown as Partial<PlanEntity>);
  }

  async findBySlug(slug: string): Promise<PlanEntity> {
    const plan = await this.prisma.plan.findFirst({
      where: { name: slug, deletedAt: null },
    });

    if (!plan) {
      throw new NotFoundException(`Plano '${slug}' não foi localizado.`);
    }

    return new PlanEntity(plan as unknown as Partial<PlanEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.plan.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}