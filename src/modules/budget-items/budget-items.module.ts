import { Module } from '@nestjs/common';
import { BudgetItemsService } from './services/budget-items.service';
import { BudgetItemsController } from './controllers/budget-items.controller';

@Module({
  controllers: [BudgetItemsController],
  providers: [BudgetItemsService],
  exports: [BudgetItemsService],
})
export class BudgetItemsModule {}
