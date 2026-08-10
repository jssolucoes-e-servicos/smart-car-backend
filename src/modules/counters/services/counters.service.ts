import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CounterEntity } from 'src/common/entities';

@Injectable()
export class CountersService {
  constructor(private readonly prisma: PrismaService) {}

  // Busca ou cria o registro de contadores para uma determinada empresa
  async getOrCreateCounter(companyId: string) {
    let counter = await this.prisma.counter.findFirst({
      where: { companyId, active: true },
    });

    if (!counter) {
      counter = await this.prisma.counter.create({
        data: {
          companyId,
          budget: 0,
          service: 0,
          receipt: 0,
          user: 0,
        },
      });
    }

    return counter;
  }

  // Incrementa um tipo específico de contador para a empresa e retorna o novo número
  async increment(companyId: string, field: 'budget' | 'service' | 'receipt' | 'user'): Promise<number> {
    const counter = await this.getOrCreateCounter(companyId);

    const updated = await this.prisma.counter.update({
      where: { id: counter.id },
      data: {
        [field]: {
          increment: 1,
        },
      },
    });

    return updated[field];
  }
}
