import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let countersService: CountersService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
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
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CountersService, useValue: mockCountersService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    countersService = module.get<CountersService>(CountersService);
    jest.clearAllMocks();
  });

  it('deve criar um usuário com sucesso auto-incrementando o código', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockCountersService.increment.mockResolvedValue(1);
    mockPrisma.user.create.mockResolvedValue({
      id: 'usr-1',
      companyId: 'comp-1',
      code: 1,
      name: 'João da Silva',
      email: 'joao.silva@email.com',
      active: true,
    });

    const result = await service.create({
      companyId: 'comp-1',
      name: 'João da Silva',
      email: 'joao.silva@email.com',
      password: 'password123',
    });

    expect(result.id).toBe('usr-1');
    expect(result.code).toBe(1);
    expect(mockCountersService.increment).toHaveBeenCalledWith('comp-1', 'user');
  });

  it('deve lançar ConflictException se o email já existir', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 'existing-id' });

    await expect(
      service.create({
        companyId: 'comp-1',
        name: 'João da Silva',
        email: 'joao.silva@email.com',
        password: 'password123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar NotFoundException se o usuário não for localizado', async () => {
    mockPrisma.user.findFirst.mockResolvedValue(null);

    await expect(service.findById('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
