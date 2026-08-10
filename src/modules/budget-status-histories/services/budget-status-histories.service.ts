import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { BudgetStatusHistoryEntity } from 'src/common/entities';

@Injectable()
export class BudgetStatusHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByBudget(budgetId: string): Promise<BudgetStatusHistoryEntity[]> {
    const histories = await this.prisma.budgetStatusHistory.findMany({
      where: { budgetId, active: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    return histories.map((h) => new BudgetStatusHistoryEntity(h as unknown as Partial<BudgetStatusHistoryEntity>));
  }

  async findById(id: string): Promise<BudgetStatusHistoryEntity> {
    const history = await this.prisma.budgetStatusHistory.findFirst({
      where: { id, deletedAt: null },
    });

    if (!history) {
      throw new NotFoundException(`Histórico de ID '${id}' não foi localizado.`);
    }

    return new BudgetStatusHistoryEntity(history as unknown as Partial<BudgetStatusHistoryEntity>);
  }
}
