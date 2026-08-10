import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptsService } from '../services/receipts.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { NotFoundException } from '@nestjs/common';

describe('ReceiptsService', () => {
  let service: ReceiptsService;
  let prisma: PrismaService;

  const mockPrisma = {
    receipt: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockCountersService = {
    increment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CountersService, useValue: mockCountersService },
      ],
    }).compile();

    service = module.get<ReceiptsService>(ReceiptsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar um recibo avulso com sucesso auto-incrementando o código', async () => {
    mockCountersService.increment.mockResolvedValue(105);
    mockPrisma.receipt.create.mockResolvedValue({
      id: 'rec-1',
      companyId: 'comp-1',
      code: 105,
      recipientName: 'Carlos Silva',
      document: '12345678909',
      value: 250.0,
      active: true,
    });

    const result = await service.create(
      {
        companyId: 'comp-1',
        recipientName: 'Carlos Silva',
        document: '12345678909',
        valueExtense: 'Duzentos e cinquenta reais',
        description: 'Serviço executado',
        value: 250.0,
      },
      'usr-123',
    );

    expect(result.id).toBe('rec-1');
    expect(result.code).toBe(105);
  });

  it('deve lançar NotFoundException se o recibo não for localizado por ID', async () => {
    mockPrisma.receipt.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
