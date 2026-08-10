import { Test, TestingModule } from '@nestjs/testing';
import { CompanyInvoicesService } from '../services/company-invoices.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CompanyInvoicesService', () => {
  let service: CompanyInvoicesService;
  let prisma: PrismaService;

  const mockPrisma = {
    companyInvoice: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyInvoicesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompanyInvoicesService>(CompanyInvoicesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar uma fatura com sucesso', async () => {
    mockPrisma.companyInvoice.findFirst.mockResolvedValue(null);
    mockPrisma.companyInvoice.create.mockResolvedValue({
      id: 'inv-1',
      companyId: 'comp-1',
      planId: 'plan-1',
      reference: '2026-08',
      amount: 149.9,
      dueDate: new Date('2026-08-15'),
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      planId: 'plan-1',
      reference: '2026-08',
      amount: 149.9,
      dueDate: new Date('2026-08-15'),
    });

    expect(result.id).toBe('inv-1');
    expect(result.reference).toBe('2026-08');
  });

  it('deve lançar ConflictException se a fatura para a referência já existir', async () => {
    mockPrisma.companyInvoice.findFirst.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        companyId: 'comp-1',
        planId: 'plan-1',
        reference: '2026-08',
        amount: 149.9,
        dueDate: new Date('2026-08-15'),
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se a fatura não for localizada por ID', async () => {
    mockPrisma.companyInvoice.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
