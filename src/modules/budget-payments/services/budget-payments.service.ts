import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { CreateBudgetPaymentDto } from '../dto/create-budget-payment.dto';
import { UpdateBudgetPaymentDto } from '../dto/update-budget-payment.dto';
import { BudgetPaymentEntity } from 'src/common/entities';

@Injectable()
export class BudgetPaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly countersService: CountersService,
  ) {}

  // Registra o pagamento do orçamento e gera automaticamente o recibo (Receipt)
  async create(dto: CreateBudgetPaymentDto, currentUserId: string): Promise<BudgetPaymentEntity> {
    const userId = dto.userId || currentUserId;

    const payment = await this.prisma.$transaction(async (tx) => {
      // 1. Criar o pagamento do orçamento
      const p = await tx.budgetPayment.create({
        data: {
          companyId: dto.companyId,
          budgetId: dto.budgetId,
          amount: dto.amount,
          method: dto.method || 'OTHER',
          externalId: dto.externalId || null,
          externalMeta: dto.externalMeta || null,
          forCustomer: dto.forCustomer ?? false,
          userId,
        },
      });

      // 2. Buscar o orçamento para obter o nome do cliente e dados adicionais
      const budget = await tx.budget.findUnique({
        where: { id: dto.budgetId },
      });
      if (!budget) {
        throw new NotFoundException(`Orçamento de ID '${dto.budgetId}' não localizado.`);
      }

      // 3. Incrementar o sequencial do recibo para a empresa
      const nextReceiptCode = await this.countersService.increment(dto.companyId, 'receipt');

      // 4. Criar o recibo correspondente na tabela receipts
      await tx.receipt.create({
        data: {
          companyId: dto.companyId,
          code: nextReceiptCode,
          budgetId: dto.budgetId,
          recipientName: budget.customerName,
          document: budget.document,
          receiptType: 'IN', // Pagamento recebido
          valueExtense: `${dto.amount} reais`, // Simples por conveniência
          description: `Recebimento referente ao orçamento #${budget.code}`,
          reverse: false,
          paymentMethod: dto.method || 'OTHER',
          value: dto.amount,
          userId,
          deletedAt: new Date(), // Correção do valor default do deletedAt na model
        },
      });

      return p;
    });

    return new BudgetPaymentEntity(payment as unknown as Partial<BudgetPaymentEntity>);
  }

  async findAllByBudget(budgetId: string): Promise<BudgetPaymentEntity[]> {
    const payments = await this.prisma.budgetPayment.findMany({
      where: { budgetId, active: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    return payments.map((p) => new BudgetPaymentEntity(p as unknown as Partial<BudgetPaymentEntity>));
  }

  async findById(id: string): Promise<BudgetPaymentEntity> {
    const payment = await this.prisma.budgetPayment.findFirst({
      where: { id, deletedAt: null },
    });

    if (!payment) {
      throw new NotFoundException(`Pagamento de ID '${id}' não foi localizado.`);
    }

    return new BudgetPaymentEntity(payment as unknown as Partial<BudgetPaymentEntity>);
  }

  async update(id: string, dto: UpdateBudgetPaymentDto): Promise<BudgetPaymentEntity> {
    await this.findById(id);

    const updated = await this.prisma.budgetPayment.update({
      where: { id },
      data: dto,
    });

    return new BudgetPaymentEntity(updated as unknown as Partial<BudgetPaymentEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.budgetPayment.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
