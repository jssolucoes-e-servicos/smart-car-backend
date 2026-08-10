import { Module } from '@nestjs/common';
import { BudgetPaymentsService } from './services/budget-payments.service';
import { BudgetPaymentsController } from './controllers/budget-payments.controller';

@Module({
  controllers: [BudgetPaymentsController],
  providers: [BudgetPaymentsService],
  exports: [BudgetPaymentsService],
})
export class BudgetPaymentsModule {}
