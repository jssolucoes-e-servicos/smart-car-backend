import { Module } from '@nestjs/common';
import { PlanCompaniesService } from './services/plan-companies.service';
import { PlanCompaniesController } from './controllers/plan-companies.controller';

@Module({
  controllers: [PlanCompaniesController],
  providers: [PlanCompaniesService],
  exports: [PlanCompaniesService],
})
export class PlanCompaniesModule {}
