// src/common/logger/logger.module.ts
import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from 'src/modules/logger/configs/logger.config';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { LoggerController } from 'src/modules/logger/controllers/logger.controller';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(loggerOptions),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule { }