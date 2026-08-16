import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('Autenticação & Perfil')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Realiza login via E-mail/CPF e Senha' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login/manager')
  @ApiOperation({ summary: 'Realiza login do gerente SaaS via E-mail e Senha' })
  async loginManager(@Body() dto: LoginDto) {
    return this.authService.loginManager(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Retorna os dados da pessoa conectada (usuário ou gerente)' })
  async getMe(@CurrentUser() currentUser: any) {
    return this.authService.getMe(currentUser.sub, currentUser.isManager);
  }
}