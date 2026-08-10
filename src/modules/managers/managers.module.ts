import { Module } from '@nestjs/common';
import { ManagersService } from './services/managers.service';
import { ManagersController } from './controllers/managers.controller';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
