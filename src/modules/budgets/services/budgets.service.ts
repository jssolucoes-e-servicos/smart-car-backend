import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { CreateBudgetDto } from '../dto/create-budget.dto';
import { UpdateBudgetDto } from '../dto/update-budget.dto';
import { BudgetEntity } from 'src/common/entities';

@Injectable()
export class BudgetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly countersService: CountersService,
  ) {}

  // Cria o orçamento, incrementa o sequencial e cria o histórico de status inicial (PENDENT)
  async create(dto: CreateBudgetDto, userId: string): Promise<BudgetEntity> {
    const nextCode = await this.countersService.increment(dto.companyId, 'budget');
    const status = dto.status || 'PENDENT';

    const budget = await this.prisma.$transaction(async (tx) => {
      const b = await tx.budget.create({
        data: {
          companyId: dto.companyId,
          code: nextCode,
          customerName: dto.customerName,
          document: dto.document || '',
          phone: dto.phone || '',
          email: dto.email || '',
          zipCode: dto.zipCode || '',
          publicPlace: dto.publicPlace || '',
          number: dto.number || '',
          complement: dto.complement || '',
          neighborhood: dto.neighborhood || '',
          city: dto.city || '',
          brand: dto.brand,
          model: dto.model,
          plate: dto.plate,
          year: dto.year || '',
          km: dto.km || '',
          description: dto.description || '',
          totalValue: dto.totalValue,
          status,
          approved: dto.approved ?? false,
          budgetItems: dto.items && dto.items.length > 0 ? {
            create: dto.items.map((item) => ({
              companyId: dto.companyId,
              name: item.name,
              value: item.value,
              serviceName: item.serviceName || item.name,
              serviceValue: item.serviceValue ?? item.value,
              suggestValue: item.suggestValue ?? item.value,
            })),
          } : undefined,
        },
        include: { budgetItems: true, budgetPayments: true, budgetStatusHistories: true },
      });

      // Registrar o histórico de status inicial
      await tx.budgetStatusHistory.create({
        data: {
          companyId: dto.companyId,
          budgetId: b.id,
          statusOld: 'PENDENT',
          status,
          userId,
        },
      });

      return b;
    });

    return new BudgetEntity({
      ...budget,
      items: budget.budgetItems,
      payments: budget.budgetPayments,
      statusHistory: budget.budgetStatusHistories,
    } as unknown as Partial<BudgetEntity>);
  }

  async findAllByCompany(companyId: string): Promise<BudgetEntity[]> {
    const budgets = await this.prisma.budget.findMany({
      where: { companyId, active: true, deletedAt: null },
      include: { budgetItems: true, budgetPayments: true, budgetStatusHistories: true },
      orderBy: { code: 'desc' },
    });

    return budgets.map((b) => new BudgetEntity({
      ...b,
      items: b.budgetItems,
      payments: b.budgetPayments,
      statusHistory: b.budgetStatusHistories,
    } as unknown as Partial<BudgetEntity>));
  }

  async findById(id: string): Promise<BudgetEntity> {
    const budget = await this.prisma.budget.findFirst({
      where: { id, deletedAt: null },
      include: { budgetItems: true, budgetPayments: true, budgetStatusHistories: true },
    });

    if (!budget) {
      throw new NotFoundException(`Orçamento de ID '${id}' não foi localizado.`);
    }

    return new BudgetEntity({
      ...budget,
      items: budget.budgetItems,
      payments: budget.budgetPayments,
      statusHistory: budget.budgetStatusHistories,
    } as unknown as Partial<BudgetEntity>);
  }

  // Atualiza o orçamento e cria um registro no histórico se o status mudou
  async update(id: string, dto: UpdateBudgetDto, userId: string): Promise<BudgetEntity> {
    const current = await this.findById(id);

    const budget = await this.prisma.$transaction(async (tx) => {
      // Se items forem enviados, limpamos os antigos e recriamos
      if (dto.items) {
        await tx.budgetItem.deleteMany({
          where: { budgetId: id },
        });

        if (dto.items.length > 0) {
          await tx.budgetItem.createMany({
            data: dto.items.map((item) => ({
              companyId: current.companyId,
              budgetId: id,
              name: item.name,
              value: item.value,
              serviceName: item.serviceName || item.name,
              serviceValue: item.serviceValue ?? item.value,
              suggestValue: item.suggestValue ?? item.value,
            })),
          });
        }
      }

      const { items, ...budgetData } = dto;

      const updated = await tx.budget.update({
        where: { id },
        data: budgetData,
        include: { budgetItems: true, budgetPayments: true, budgetStatusHistories: true },
      });

      // Se o status foi alterado, grava no histórico de status automaticamente
      if (dto.status && dto.status !== current.status) {
        await tx.budgetStatusHistory.create({
          data: {
            companyId: current.companyId,
            budgetId: id,
            statusOld: current.status as any,
            status: dto.status,
            userId,
          },
        });
      }

      return updated;
    });

    return new BudgetEntity({
      ...budget,
      items: budget.budgetItems,
      payments: budget.budgetPayments,
      statusHistory: budget.budgetStatusHistories,
    } as unknown as Partial<BudgetEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.budget.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
