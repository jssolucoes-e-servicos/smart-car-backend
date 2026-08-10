import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyInvoicesService } from '../services/company-invoices.service';
import { CreateCompanyInvoiceDto } from '../dto/create-company-invoice.dto';
import { UpdateCompanyInvoiceDto } from '../dto/update-company-invoice.dto';
import { CompanyInvoiceEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Faturamento / Faturas das Empresas')
@Controller('company-invoices')
export class CompanyInvoicesController {
  constructor(private readonly companyInvoicesService: CompanyInvoicesService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Lista faturas de uma oficina específica',
    responseType: [CompanyInvoiceEntity],
  })
  async findAllByCompany(@Param('companyId') companyId: string): Promise<CompanyInvoiceEntity[]> {
    return this.companyInvoicesService.findAllByCompany(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de uma fatura por ID',
    responseType: CompanyInvoiceEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<CompanyInvoiceEntity> {
    return this.companyInvoicesService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Gera uma nova fatura de plano para empresa',
    responseType: CompanyInvoiceEntity,
  })
  async create(@Body() dto: CreateCompanyInvoiceDto): Promise<CompanyInvoiceEntity> {
    return this.companyInvoicesService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de faturamento/pagamento da fatura',
    responseType: CompanyInvoiceEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateCompanyInvoiceDto,
  ): Promise<CompanyInvoiceEntity> {
    return this.companyInvoicesService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Remove/Cancela uma fatura (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.companyInvoicesService.remove(id);
  }
}
