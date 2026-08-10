import { Module } from '@nestjs/common';
import { ReceiptsService } from './services/receipts.service';
import { ReceiptsController } from './controllers/receipts.controller';

@Module({
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
