import { Controller, Body, Param, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReceiptsService } from '../services/receipts.service';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';
import { ReceiptEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Recibos Emitidos')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Lista todos os recibos emitidos por uma oficina específica',
    responseType: [ReceiptEntity],
  })
  async findAllByCompany(@Param('companyId') companyId: string): Promise<ReceiptEntity[]> {
    return this.receiptsService.findAllByCompany(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um recibo emitido por ID',
    responseType: ReceiptEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<ReceiptEntity> {
    return this.receiptsService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Emite um novo recibo avulso na oficina',
    responseType: ReceiptEntity,
  })
  async create(
    @Body() dto: CreateReceiptDto,
    @Headers('x-user-id') userId: string,
  ): Promise<ReceiptEntity> {
    return this.receiptsService.create(dto, userId || 'system');
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um recibo ou realiza estorno',
    responseType: ReceiptEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateReceiptDto,
  ): Promise<ReceiptEntity> {
    return this.receiptsService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa um recibo emitido (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.receiptsService.remove(id);
  }
}
