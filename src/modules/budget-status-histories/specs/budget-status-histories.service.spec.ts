import { Test, TestingModule } from '@nestjs/testing';
import { BudgetStatusHistoriesService } from '../services/budget-status-histories.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BudgetStatusHistoriesService', () => {
  let service: BudgetStatusHistoriesService;
  let prisma: PrismaService;

  const mockPrisma = {
    budgetStatusHistory: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetStatusHistoriesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BudgetStatusHistoriesService>(BudgetStatusHistoriesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve buscar histórico por orçamento', async () => {
    mockPrisma.budgetStatusHistory.findMany.mockResolvedValue([
      { id: 'bsh-1', budgetId: 'bud-1', statusOld: 'PENDENT', status: 'APPROVED' },
    ]);

    const result = await service.findAllByBudget('bud-1');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('bsh-1');
  });

  it('deve lançar NotFoundException se o histórico não existir', async () => {
    mockPrisma.budgetStatusHistory.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
