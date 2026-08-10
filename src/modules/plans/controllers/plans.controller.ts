// src/modules/plans/controllers/plans.controller.ts

import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlansService } from 'src/modules/plans/services/plans.service';
import { CreatePlanDto } from 'src/modules/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/modules/plans/dto/update-plan.dto';
import { PlanEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { PublicRoute } from 'src/common/decorators/routes/public-route.decorator';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Planos SaaS (Billing)')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) { }

  @PublicRoute('GET', '', {
    summary: 'Lista os planos ativos do SaaS (Público no site)',
    responseType: [PlanEntity],
  })
  async findAll(): Promise<PlanEntity[]> {
    return this.plansService.findAllActive();
  }

  @PublicRoute('GET', ':slug', {
    summary: 'Busca detalhes de um plano pelo slug',
    responseType: PlanEntity,
  })
  async findBySlug(@Param('slug') slug: string): Promise<PlanEntity> {
    return this.plansService.findBySlug(slug);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria um novo plano SaaS (Super Admin)',
    responseType: PlanEntity,
  })
  async create(@Body() dto: CreatePlanDto): Promise<PlanEntity> {
    return this.plansService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de um plano existente',
    responseType: PlanEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdatePlanDto,
  ): Promise<PlanEntity> {
    return this.plansService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove um plano (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.plansService.remove(id);
  }
}