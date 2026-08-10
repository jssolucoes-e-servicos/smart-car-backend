import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreateCompanyInvoiceDto } from '../dto/create-company-invoice.dto';
import { UpdateCompanyInvoiceDto } from '../dto/update-company-invoice.dto';
import { CompanyInvoiceEntity } from 'src/common/entities';

@Injectable()
export class CompanyInvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyInvoiceDto): Promise<CompanyInvoiceEntity> {
    const existing = await this.prisma.companyInvoice.findFirst({
      where: {
        companyId: dto.companyId,
        reference: dto.reference,
        active: true,
      },
    });

    if (existing) {
      throw new ConflictException(
        `Já existe uma fatura gerada para a empresa na referência '${dto.reference}'.`,
      );
    }

    const companyInvoice = await this.prisma.companyInvoice.create({
      data: {
        companyId: dto.companyId,
        planId: dto.planId,
        reference: dto.reference,
        amount: dto.amount,
        dueDate: dto.dueDate,
        paymentMethod: dto.paymentMethod || 'PIX',
        invoiceStatus: dto.invoiceStatus || 'PENDING',
      },
    });

    return new CompanyInvoiceEntity(companyInvoice as unknown as Partial<CompanyInvoiceEntity>);
  }

  async findAllByCompany(companyId: string): Promise<CompanyInvoiceEntity[]> {
    const invoices = await this.prisma.companyInvoice.findMany({
      where: { companyId, active: true, deletedAt: null },
      orderBy: { dueDate: 'desc' },
    });

    return invoices.map((i) => new CompanyInvoiceEntity(i as unknown as Partial<CompanyInvoiceEntity>));
  }

  async findById(id: string): Promise<CompanyInvoiceEntity> {
    const invoice = await this.prisma.companyInvoice.findFirst({
      where: { id, deletedAt: null },
    });

    if (!invoice) {
      throw new NotFoundException(`Fatura de ID '${id}' não foi localizada.`);
    }

    return new CompanyInvoiceEntity(invoice as unknown as Partial<CompanyInvoiceEntity>);
  }

  async update(id: string, dto: UpdateCompanyInvoiceDto): Promise<CompanyInvoiceEntity> {
    await this.findById(id);

    const updated = await this.prisma.companyInvoice.update({
      where: { id },
      data: dto,
    });

    return new CompanyInvoiceEntity(updated as unknown as Partial<CompanyInvoiceEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.companyInvoice.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
