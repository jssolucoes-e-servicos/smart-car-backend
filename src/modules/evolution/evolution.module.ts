// src/modules/discord/discord.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvolutionService } from 'src/modules/evolution/services/evolution.service';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [EvolutionService],
  exports: [EvolutionService],
})
export class EvolutionModule { }