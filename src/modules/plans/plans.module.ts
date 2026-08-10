import { Module } from '@nestjs/common';
import { PlansService } from 'src/modules/plans/services/plans.service';
import { PlansController } from 'src/modules/plans/controllers/plans.controller';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule { }