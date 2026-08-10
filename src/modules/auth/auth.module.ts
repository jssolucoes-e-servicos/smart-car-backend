// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }