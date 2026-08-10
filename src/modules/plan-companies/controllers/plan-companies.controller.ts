import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanCompaniesService } from '../services/plan-companies.service';
import { CreatePlanCompanyDto } from '../dto/create-plan-company.dto';
import { UpdatePlanCompanyDto } from '../dto/update-plan-company.dto';
import { PlanCompanyEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Assinaturas das Empresas (SaaS)')
@Controller('plan-companies')
export class PlanCompaniesController {
  constructor(private readonly planCompaniesService: PlanCompaniesService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Busca o plano contratado de uma oficina pelo ID da empresa',
    responseType: PlanCompanyEntity,
  })
  async findByCompany(@Param('companyId') companyId: string): Promise<PlanCompanyEntity> {
    return this.planCompaniesService.findByCompanyId(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca registro de assinatura por ID',
    responseType: PlanCompanyEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<PlanCompanyEntity> {
    return this.planCompaniesService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Vincula uma empresa a um plano',
    responseType: PlanCompanyEntity,
  })
  async create(@Body() dto: CreatePlanCompanyDto): Promise<PlanCompanyEntity> {
    return this.planCompaniesService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de contratação do plano',
    responseType: PlanCompanyEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdatePlanCompanyDto,
  ): Promise<PlanCompanyEntity> {
    return this.planCompaniesService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Cancela contratação de plano (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.planCompaniesService.remove(id);
  }
}
