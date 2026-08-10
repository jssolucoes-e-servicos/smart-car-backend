import { Controller, Body, Param, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BudgetPaymentsService } from '../services/budget-payments.service';
import { CreateBudgetPaymentDto } from '../dto/create-budget-payment.dto';
import { UpdateBudgetPaymentDto } from '../dto/update-budget-payment.dto';
import { BudgetPaymentEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Pagamentos de Orçamentos')
@Controller('budget-payments')
export class BudgetPaymentsController {
  constructor(private readonly budgetPaymentsService: BudgetPaymentsService) {}

  @ProtectedRoute('GET', 'budget/:budgetId', {
    summary: 'Lista todos os pagamentos realizados em um orçamento específico',
    responseType: [BudgetPaymentEntity],
  })
  async findAllByBudget(@Param('budgetId') budgetId: string): Promise<BudgetPaymentEntity[]> {
    return this.budgetPaymentsService.findAllByBudget(budgetId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um pagamento por ID',
    responseType: BudgetPaymentEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<BudgetPaymentEntity> {
    return this.budgetPaymentsService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Registra um novo pagamento de orçamento (Gera recibo automaticamente)',
    responseType: BudgetPaymentEntity,
  })
  async create(
    @Body() dto: CreateBudgetPaymentDto,
    @Headers('x-user-id') userId: string,
  ): Promise<BudgetPaymentEntity> {
    return this.budgetPaymentsService.create(dto, userId || 'system');
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados do pagamento',
    responseType: BudgetPaymentEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateBudgetPaymentDto,
  ): Promise<BudgetPaymentEntity> {
    return this.budgetPaymentsService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Remove um pagamento (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.budgetPaymentsService.remove(id);
  }
}
