import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagersService } from '../services/managers.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { ManagerEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Gerentes do SaaS')
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @ProtectedRoute('GET', '', {
    summary: 'Lista todos os gerentes ativos',
    responseType: [ManagerEntity],
  })
  async findAll(): Promise<ManagerEntity[]> {
    return this.managersService.findAllActive();
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um gerente por ID',
    responseType: ManagerEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<ManagerEntity> {
    return this.managersService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria um novo gerente SaaS',
    responseType: ManagerEntity,
  })
  async create(@Body() dto: CreateManagerDto): Promise<ManagerEntity> {
    return this.managersService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um gerente existente',
    responseType: ManagerEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateManagerDto,
  ): Promise<ManagerEntity> {
    return this.managersService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um gerente (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.managersService.remove(id);
  }
}
