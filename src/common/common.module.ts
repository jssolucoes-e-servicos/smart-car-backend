import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DiscordModule } from 'src/modules/discord/discord.module';
import { EvolutionModule } from 'src/modules/evolution/evolution.module';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    PrismaModule,
    PassportModule,
    DiscordModule,
    EvolutionModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'smartChurchesSecretKey',
      signOptions: { expiresIn: '7d' },
    }),
  ]
})
export class CommonModule { }
