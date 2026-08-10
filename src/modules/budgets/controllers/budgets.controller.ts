import { Controller, Body, Param, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BudgetsService } from '../services/budgets.service';
import { CreateBudgetDto } from '../dto/create-budget.dto';
import { UpdateBudgetDto } from '../dto/update-budget.dto';
import { BudgetEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Orçamentos Automotivos')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Lista todos os orçamentos de uma oficina específica',
    responseType: [BudgetEntity],
  })
  async findAllByCompany(@Param('companyId') companyId: string): Promise<BudgetEntity[]> {
    return this.budgetsService.findAllByCompany(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um orçamento por ID',
    responseType: BudgetEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<BudgetEntity> {
    return this.budgetsService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria um novo orçamento na oficina',
    responseType: BudgetEntity,
  })
  async create(
    @Body() dto: CreateBudgetDto,
    @Headers('x-user-id') userId: string, // Simula a captura do ID do usuário que alterou
  ): Promise<BudgetEntity> {
    return this.budgetsService.create(dto, userId || 'system');
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um orçamento (Gera histórico se o status mudar)',
    responseType: BudgetEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateBudgetDto,
    @Headers('x-user-id') userId: string,
  ): Promise<BudgetEntity> {
    return this.budgetsService.update(id, dto, userId || 'system');
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um orçamento (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.budgetsService.remove(id);
  }
}
