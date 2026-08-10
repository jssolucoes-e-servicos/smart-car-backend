import { Module, Global } from '@nestjs/common';
import { CountersService } from './services/counters.service';

@Global()
@Module({
  providers: [CountersService],
  exports: [CountersService],
})
export class CountersModule {}
