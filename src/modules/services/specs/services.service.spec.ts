import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from '../services/services.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: PrismaService;
  let countersService: CountersService;

  const mockPrisma = {
    service: {
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
        ServicesService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CountersService, useValue: mockCountersService },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prisma = module.get<PrismaService>(PrismaService);
    countersService = module.get<CountersService>(CountersService);
    jest.clearAllMocks();
  });

  it('deve criar um serviço com sucesso com código incrementado', async () => {
    mockCountersService.increment.mockResolvedValue(10);
    mockPrisma.service.create.mockResolvedValue({
      id: 'srv-1',
      companyId: 'comp-1',
      code: 10,
      name: 'Troca de Óleo',
      description: 'Troca de óleo',
      value: 150.0,
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      name: 'Troca de Óleo',
      description: 'Troca de óleo',
      value: 150.0,
    });

    expect(result.id).toBe('srv-1');
    expect(result.code).toBe(10);
    expect(mockCountersService.increment).toHaveBeenCalledWith('comp-1', 'service');
  });

  it('deve lançar NotFoundException se o serviço não for localizado', async () => {
    mockPrisma.service.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
