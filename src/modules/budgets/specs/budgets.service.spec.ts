import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsService } from '../services/budgets.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { NotFoundException } from '@nestjs/common';

describe('BudgetsService', () => {
  let service: BudgetsService;
  let prisma: PrismaService;

  const mockPrisma = {
    budget: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    budgetStatusHistory: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrisma)),
  };

  const mockCountersService = {
    increment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CountersService, useValue: mockCountersService },
      ],
    }).compile();

    service = module.get<BudgetsService>(BudgetsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar um orçamento e gerar histórico com sucesso', async () => {
    mockCountersService.increment.mockResolvedValue(45);
    mockPrisma.budget.create.mockResolvedValue({
      id: 'bud-1',
      companyId: 'comp-1',
      code: 45,
      customerName: 'Carlos Silva',
      totalValue: 450.0,
      status: 'PENDENT',
      approved: false,
    });

    const result = await service.create(
      {
        companyId: 'comp-1',
        customerName: 'Carlos Silva',
        brand: 'Chevrolet',
        model: 'Onix',
        plate: 'IXO9B88',
        totalValue: 450.0,
      },
      'usr-123',
    );

    expect(result.id).toBe('bud-1');
    expect(result.code).toBe(45);
    expect(mockPrisma.budgetStatusHistory.create).toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o orçamento não for localizado por ID', async () => {
    mockPrisma.budget.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
