import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CountersService } from 'src/modules/counters/services/counters.service';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';
import { ReceiptEntity } from 'src/common/entities';

@Injectable()
export class ReceiptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly countersService: CountersService,
  ) {}

  // Cadastro de recibo avulso (usando o contador sequencial de recibo da empresa)
  async create(dto: CreateReceiptDto, currentUserId: string): Promise<ReceiptEntity> {
    const nextCode = await this.countersService.increment(dto.companyId, 'receipt');
    const userId = dto.userId || currentUserId;

    const receipt = await this.prisma.receipt.create({
      data: {
        companyId: dto.companyId,
        code: nextCode,
        budgetId: dto.budgetId || null,
        recipientName: dto.recipientName,
        document: dto.document,
        receiptType: dto.receiptType || 'IN',
        valueExtense: dto.valueExtense,
        description: dto.description,
        reverse: false,
        paymentMethod: dto.paymentMethod || 'OTHER',
        value: dto.value,
        userId,
        deletedAt: new Date(), // Ajuste do valor para corresponder a deletedAt na model
      },
    });

    return new ReceiptEntity(receipt as unknown as Partial<ReceiptEntity>);
  }

  async findAllByCompany(companyId: string): Promise<ReceiptEntity[]> {
    const receipts = await this.prisma.receipt.findMany({
      where: { companyId, active: true },
      orderBy: { code: 'desc' },
    });

    return receipts.map((r) => new ReceiptEntity(r as unknown as Partial<ReceiptEntity>));
  }

  async findById(id: string): Promise<ReceiptEntity> {
    const receipt = await this.prisma.receipt.findFirst({
      where: { id },
    });

    if (!receipt) {
      throw new NotFoundException(`Recibo de ID '${id}' não foi localizado.`);
    }

    return new ReceiptEntity(receipt as unknown as Partial<ReceiptEntity>);
  }

  async update(id: string, dto: UpdateReceiptDto): Promise<ReceiptEntity> {
    await this.findById(id);

    const updated = await this.prisma.receipt.update({
      where: { id },
      data: dto,
    });

    return new ReceiptEntity(updated as unknown as Partial<ReceiptEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.receipt.update({
      where: { id },
      data: { active: false },
    });
  }
}
