import { Module } from '@nestjs/common';
import { CompanyInvoicesService } from './services/company-invoices.service';
import { CompanyInvoicesController } from './controllers/company-invoices.controller';

@Module({
  controllers: [CompanyInvoicesController],
  providers: [CompanyInvoicesService],
  exports: [CompanyInvoicesService],
})
export class CompanyInvoicesModule {}
