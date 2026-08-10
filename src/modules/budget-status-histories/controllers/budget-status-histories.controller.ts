import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BudgetStatusHistoriesService } from '../services/budget-status-histories.service';
import { BudgetStatusHistoryEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Histórico de Status de Orçamentos')
@Controller('budget-status-histories')
export class BudgetStatusHistoriesController {
  constructor(private readonly budgetStatusHistoriesService: BudgetStatusHistoriesService) {}

  @ProtectedRoute('GET', 'budget/:budgetId', {
    summary: 'Busca todo o histórico de alterações de status de um orçamento específico',
    responseType: [BudgetStatusHistoryEntity],
  })
  async findAllByBudget(@Param('budgetId') budgetId: string): Promise<BudgetStatusHistoryEntity[]> {
    return this.budgetStatusHistoriesService.findAllByBudget(budgetId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca um registro específico do histórico',
    responseType: BudgetStatusHistoryEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<BudgetStatusHistoryEntity> {
    return this.budgetStatusHistoriesService.findById(id);
  }
}
