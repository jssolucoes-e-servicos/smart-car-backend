import { Test, TestingModule } from '@nestjs/testing';
import { PlanCompaniesService } from '../services/plan-companies.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PlanCompaniesService', () => {
  let service: PlanCompaniesService;
  let prisma: PrismaService;

  const mockPrisma = {
    planCompany: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanCompaniesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PlanCompaniesService>(PlanCompaniesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve vincular plano a empresa com sucesso', async () => {
    mockPrisma.planCompany.findFirst.mockResolvedValue(null);
    mockPrisma.planCompany.create.mockResolvedValue({
      id: 'pc-1',
      companyId: 'comp-1',
      planId: 'plan-1',
      isTrial: true,
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      planId: 'plan-1',
      isTrial: true,
    });

    expect(result.id).toBe('pc-1');
    expect(result.companyId).toBe('comp-1');
  });

  it('deve lançar ConflictException se a empresa já possui plano ativo', async () => {
    mockPrisma.planCompany.findFirst.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        companyId: 'comp-1',
        planId: 'plan-1',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se o vínculo não for localizado por ID', async () => {
    mockPrisma.planCompany.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
