import { Controller, Body, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Usuários da Oficina')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Lista todos os usuários ativos de uma oficina específica',
    responseType: [UserEntity],
  })
  async findAllByCompany(@Param('companyId') companyId: string): Promise<UserEntity[]> {
    return this.usersService.findAllByCompany(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um usuário por ID',
    responseType: UserEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<UserEntity> {
    return this.usersService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria um novo usuário da oficina',
    responseType: UserEntity,
  })
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um usuário existente',
    responseType: UserEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um usuário da oficina (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.usersService.remove(id);
  }
}
