import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PlansModule } from 'src/modules/plans/plans.module';
import { CountersModule } from 'src/modules/counters/counters.module';
import { ManagersModule } from 'src/modules/managers/managers.module';
import { CompaniesModule } from 'src/modules/companies/companies.module';
import { CompanySettingsModule } from 'src/modules/company-settings/company-settings.module';
import { UsersModule } from 'src/modules/users/users.module';
import { PlanCompaniesModule } from 'src/modules/plan-companies/plan-companies.module';
import { CompanyInvoicesModule } from 'src/modules/company-invoices/company-invoices.module';
import { ServicesModule } from 'src/modules/services/services.module';
import { BudgetsModule } from 'src/modules/budgets/budgets.module';
import { BudgetStatusHistoriesModule } from 'src/modules/budget-status-histories/budget-status-histories.module';
import { BudgetItemsModule } from 'src/modules/budget-items/budget-items.module';
import { BudgetPaymentsModule } from 'src/modules/budget-payments/budget-payments.module';
import { ReceiptsModule } from 'src/modules/receipts/receipts.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    PlansModule,
    CountersModule,
    ManagersModule,
    CompaniesModule,
    CompanySettingsModule,
    UsersModule,
    PlanCompaniesModule,
    CompanyInvoicesModule,
    ServicesModule,
    BudgetsModule,
    BudgetStatusHistoriesModule,
    BudgetItemsModule,
    BudgetPaymentsModule,
    ReceiptsModule,
  ],
})
export class AppModule {}
