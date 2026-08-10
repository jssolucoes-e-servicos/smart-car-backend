import { Test, TestingModule } from '@nestjs/testing';
import { BudgetItemsService } from '../services/budget-items.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BudgetItemsService', () => {
  let service: BudgetItemsService;
  let prisma: PrismaService;

  const mockPrisma = {
    budgetItem: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetItemsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BudgetItemsService>(BudgetItemsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar um item de orçamento com sucesso', async () => {
    mockPrisma.budgetItem.create.mockResolvedValue({
      id: 'bi-1',
      companyId: 'comp-1',
      budgetId: 'bud-1',
      serviceName: 'Troca de Óleo',
      serviceValue: 150.0,
      name: 'Pastilha de Freio Cobreq',
      value: 120.0,
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      budgetId: 'bud-1',
      serviceName: 'Troca de Óleo',
      serviceValue: 150.0,
      name: 'Pastilha de Freio Cobreq',
      value: 120.0,
    });

    expect(result.id).toBe('bi-1');
    expect(result.serviceName).toBe('Troca de Óleo');
  });

  it('deve lançar NotFoundException se o item não for localizado por ID', async () => {
    mockPrisma.budgetItem.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
