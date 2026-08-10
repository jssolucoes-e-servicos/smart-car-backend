import { Test, TestingModule } from '@nestjs/testing';
import { CompanySettingsService } from '../services/company-settings.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CompanySettingsService', () => {
  let service: CompanySettingsService;
  let prisma: PrismaService;

  const mockPrisma = {
    companySetting: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanySettingsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompanySettingsService>(CompanySettingsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar configurações com sucesso', async () => {
    mockPrisma.companySetting.findFirst.mockResolvedValue(null);
    mockPrisma.companySetting.create.mockResolvedValue({
      id: 'set-1',
      companyId: 'comp-1',
      themeColor: '#000000',
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      themeColor: '#000000',
    });

    expect(result.id).toBe('set-1');
    expect(result.companyId).toBe('comp-1');
  });

  it('deve lançar ConflictException se configurações ativas já existirem', async () => {
    mockPrisma.companySetting.findFirst.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        companyId: 'comp-1',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se a configuração não for localizada por ID', async () => {
    mockPrisma.companySetting.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
