import { Module } from '@nestjs/common';
import { CompanySettingsService } from './services/company-settings.service';
import { CompanySettingsController } from './controllers/company-settings.controller';

@Module({
  controllers: [CompanySettingsController],
  providers: [CompanySettingsService],
  exports: [CompanySettingsService],
})
export class CompanySettingsModule {}
