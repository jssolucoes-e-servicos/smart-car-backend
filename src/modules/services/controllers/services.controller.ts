import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Serviços da Oficina')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Lista todos os serviços de uma oficina específica',
    responseType: [ServiceEntity],
  })
  async findAllByCompany(@Param('companyId') companyId: string): Promise<ServiceEntity[]> {
    return this.servicesService.findAllByCompany(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de um serviço por ID',
    responseType: ServiceEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<ServiceEntity> {
    return this.servicesService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cadastra um novo serviço na oficina',
    responseType: ServiceEntity,
  })
  async create(@Body() dto: CreateServiceDto): Promise<ServiceEntity> {
    return this.servicesService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um serviço cadastrado',
    responseType: ServiceEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    return this.servicesService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um serviço da oficina (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.servicesService.remove(id);
  }
}
