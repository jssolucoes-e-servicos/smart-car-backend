import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreateBudgetItemDto } from '../dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from '../dto/update-budget-item.dto';
import { BudgetItemEntity } from 'src/common/entities';

@Injectable()
export class BudgetItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBudgetItemDto): Promise<BudgetItemEntity> {
    const budgetItem = await this.prisma.budgetItem.create({
      data: {
        companyId: dto.companyId,
        budgetId: dto.budgetId,
        serviceName: dto.serviceName,
        serviceValue: dto.serviceValue,
        suggestValue: dto.suggestValue ?? 0,
        referenceId: dto.referenceId || null,
        name: dto.name,
        value: dto.value,
        removed: dto.removed ?? false,
      },
    });

    return new BudgetItemEntity(budgetItem as unknown as Partial<BudgetItemEntity>);
  }

  async findAllByBudget(budgetId: string): Promise<BudgetItemEntity[]> {
    const items = await this.prisma.budgetItem.findMany({
      where: { budgetId, active: true, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    return items.map((i) => new BudgetItemEntity(i as unknown as Partial<BudgetItemEntity>));
  }

  async findById(id: string): Promise<BudgetItemEntity> {
    const item = await this.prisma.budgetItem.findFirst({
      where: { id, deletedAt: null },
    });

    if (!item) {
      throw new NotFoundException(`Item de orçamento de ID '${id}' não foi localizado.`);
    }

    return new BudgetItemEntity(item as unknown as Partial<BudgetItemEntity>);
  }

  async update(id: string, dto: UpdateBudgetItemDto): Promise<BudgetItemEntity> {
    await this.findById(id);

    const updated = await this.prisma.budgetItem.update({
      where: { id },
      data: dto,
    });

    return new BudgetItemEntity(updated as unknown as Partial<BudgetItemEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.budgetItem.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
