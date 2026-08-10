import { Test, TestingModule } from '@nestjs/testing';
import { BudgetPaymentsService } from '../services/budget-payments.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { NotFoundException } from '@nestjs/common';

describe('BudgetPaymentsService', () => {
  let service: BudgetPaymentsService;
  let prisma: PrismaService;

  const mockPrisma = {
    budgetPayment: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    budget: {
      findUnique: jest.fn(),
    },
    receipt: {
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
        BudgetPaymentsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CountersService, useValue: mockCountersService },
      ],
    }).compile();

    service = module.get<BudgetPaymentsService>(BudgetPaymentsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve registrar pagamento de orçamento e gerar recibo com sucesso', async () => {
    mockPrisma.budget.findUnique.mockResolvedValue({
      id: 'bud-1',
      customerName: 'Carlos Silva',
      document: '12345678909',
      code: 45,
    });
    mockCountersService.increment.mockResolvedValue(102);
    mockPrisma.budgetPayment.create.mockResolvedValue({
      id: 'bp-1',
      companyId: 'comp-1',
      budgetId: 'bud-1',
      amount: 250.0,
      method: 'CARD_CREDIT',
      userId: 'usr-123',
    });

    const result = await service.create(
      {
        companyId: 'comp-1',
        budgetId: 'bud-1',
        amount: 250.0,
        method: 'CARD_CREDIT',
        userId: 'usr-123',
      },
      'system',
    );

    expect(result.id).toBe('bp-1');
    expect(mockPrisma.receipt.create).toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o pagamento não for localizado por ID', async () => {
    mockPrisma.budgetPayment.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
