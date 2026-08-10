import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from 'src/modules/plans/services/plans.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PlansService', () => {
  let service: PlansService;
  let prisma: PrismaService;

  const mockPrisma = {
    plan: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar um plano com sucesso', async () => {
    mockPrisma.plan.findUnique.mockResolvedValue(null);
    mockPrisma.plan.create.mockResolvedValue({
      id: 'plan-1',
      name: 'Plano Pro',
      month: 149.9,
      biannual: 1490.0,
      annual: 1490.0,
      maxUsers: 10,
      maxBudgetsMonth: 100,
      maxDevices: 10,
      active: true,
    });

    const result = await service.create({
      name: 'Plano Pro',
      month: 149.9,
      biannual: 1490.0,
      annual: 1490.0,
      maxUsers: 10,
      maxBudgetsMonth: 100,
      maxDevices: 10,
    });

    expect(result.id).toBe('plan-1');
    expect(result.name).toBe('Plano Pro');
  });

  it('deve lançar ConflictException se o mome do plano já existir', async () => {
    mockPrisma.plan.findUnique.mockResolvedValue({ id: 'existing-id', name: 'Plano Pro' });

    await expect(
      service.create({
        name: 'Plano Pro',
        month: 149.9,
        biannual: 1490.0,
        annual: 1490.0,
        maxUsers: 10,
        maxBudgetsMonth: 100,
        maxDevices: 10,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se o plano não for localizado por ID', async () => {
    mockPrisma.plan.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});