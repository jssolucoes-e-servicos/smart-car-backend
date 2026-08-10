import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BudgetItemsService } from '../services/budget-items.service';
import { CreateBudgetItemDto } from '../dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from '../dto/update-budget-item.dto';
import { BudgetItemEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Itens de Orçamentos')
@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @ProtectedRoute('GET', 'budget/:budgetId', {
    summary: 'Lista todos os itens/serviços de um orçamento específico',
    responseType: [BudgetItemEntity],
  })
  async findAllByBudget(@Param('budgetId') budgetId: string): Promise<BudgetItemEntity[]> {
    return this.budgetItemsService.findAllByBudget(budgetId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um item do orçamento por ID',
    responseType: BudgetItemEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<BudgetItemEntity> {
    return this.budgetItemsService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Adiciona um novo item ou serviço ao orçamento',
    responseType: BudgetItemEntity,
  })
  async create(@Body() dto: CreateBudgetItemDto): Promise<BudgetItemEntity> {
    return this.budgetItemsService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados do item do orçamento',
    responseType: BudgetItemEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateBudgetItemDto,
  ): Promise<BudgetItemEntity> {
    return this.budgetItemsService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um item do orçamento (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.budgetItemsService.remove(id);
  }
}
