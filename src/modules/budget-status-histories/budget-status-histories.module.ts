import { Module } from '@nestjs/common';
import { BudgetStatusHistoriesService } from './services/budget-status-histories.service';
import { BudgetStatusHistoriesController } from './controllers/budget-status-histories.controller';

@Module({
  controllers: [BudgetStatusHistoriesController],
  providers: [BudgetStatusHistoriesService],
  exports: [BudgetStatusHistoriesService],
})
export class BudgetStatusHistoriesModule {}
