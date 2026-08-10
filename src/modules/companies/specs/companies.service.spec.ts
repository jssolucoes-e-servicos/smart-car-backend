import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../services/companies.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prisma: PrismaService;

  const mockPrisma = {
    company: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar uma empresa com sucesso', async () => {
    mockPrisma.company.findFirst.mockResolvedValue(null);
    mockPrisma.company.create.mockResolvedValue({
      id: 'comp-1',
      name: 'SmartCar Ltda',
      fantasy: 'Oficina SmartCar',
      cnpj: '12345678000195',
      ie: 'ISENTO',
      phone: '51999999999',
      email: 'contato@smartcar.com',
      addressInLine: 'Rua das Flores, 123',
      zipCode: '90000000',
      publicPlace: 'Rua das Flores',
      number: '123',
      complement: 'Sala A',
      neighborhood: 'Centro',
      city: 'Porto Alegre',
      state: 'RS',
      logo: 'https://smartcar.com/logo.png',
      active: true,
    });

    const result = await service.create({
      name: 'SmartCar Ltda',
      fantasy: 'Oficina SmartCar',
      cnpj: '12345678000195',
      ie: 'ISENTO',
      phone: '51999999999',
      email: 'contato@smartcar.com',
      addressInLine: 'Rua das Flores, 123',
      zipCode: '90000000',
      publicPlace: 'Rua das Flores',
      number: '123',
      complement: 'Sala A',
      neighborhood: 'Centro',
      city: 'Porto Alegre',
      state: 'RS',
      logo: 'https://smartcar.com/logo.png',
    });

    expect(result.id).toBe('comp-1');
    expect(result.name).toBe('SmartCar Ltda');
  });

  it('deve lançar ConflictException se o CNPJ já estiver registrado', async () => {
    mockPrisma.company.findFirst.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        name: 'SmartCar Ltda',
        fantasy: 'Oficina SmartCar',
        cnpj: '12345678000195',
        ie: 'ISENTO',
        phone: '51999999999',
        email: 'contato@smartcar.com',
        addressInLine: 'Rua das Flores, 123',
        zipCode: '90000000',
        publicPlace: 'Rua das Flores',
        number: '123',
        complement: 'Sala A',
        neighborhood: 'Centro',
        city: 'Porto Alegre',
        state: 'RS',
        logo: 'https://smartcar.com/logo.png',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se a empresa não for localizada por ID', async () => {
    mockPrisma.company.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
