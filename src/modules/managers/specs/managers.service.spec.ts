import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from '../services/managers.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ManagersService', () => {
  let service: ManagersService;
  let prisma: PrismaService;

  const mockPrisma = {
    manager: {
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
        ManagersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ManagersService>(ManagersService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('deve criar um gerente com sucesso', async () => {
    mockPrisma.manager.findUnique.mockResolvedValue(null);
    mockPrisma.manager.create.mockResolvedValue({
      id: 'mgr-1',
      name: 'Gerente Teste',
      email: 'teste@smartcar.com',
      cpf: '12345678900',
      phone: '51999999999',
      active: true,
    });

    const result = await service.create({
      name: 'Gerente Teste',
      email: 'teste@smartcar.com',
      cpf: '12345678900',
      phone: '51999999999',
      password: 'password123',
    });

    expect(result.id).toBe('mgr-1');
    expect(result.name).toBe('Gerente Teste');
  });

  it('deve lançar ConflictException se o email já estiver em uso', async () => {
    mockPrisma.manager.findUnique.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        name: 'Gerente Teste',
        email: 'teste@smartcar.com',
        cpf: '12345678900',
        phone: '51999999999',
        password: 'password123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se o gerente não for localizado', async () => {
    mockPrisma.manager.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
