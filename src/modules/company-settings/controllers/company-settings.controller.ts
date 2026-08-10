import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanySettingsService } from '../services/company-settings.service';
import { CreateCompanySettingDto } from '../dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from '../dto/update-company-setting.dto';
import { CompanySettingEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';

@ApiTags('Configurações da Oficina')
@Controller('company-settings')
export class CompanySettingsController {
  constructor(private readonly companySettingsService: CompanySettingsService) {}

  @ProtectedRoute('GET', 'company/:companyId', {
    summary: 'Busca as configurações ativas de uma empresa pelo ID da empresa',
    responseType: CompanySettingEntity,
  })
  async findByCompany(@Param('companyId') companyId: string): Promise<CompanySettingEntity> {
    return this.companySettingsService.findByCompanyId(companyId);
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca configurações por ID do registro',
    responseType: CompanySettingEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<CompanySettingEntity> {
    return this.companySettingsService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria novas configurações para uma oficina',
    responseType: CompanySettingEntity,
  })
  async create(@Body() dto: CreateCompanySettingDto): Promise<CompanySettingEntity> {
    return this.companySettingsService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza configurações existentes',
    responseType: CompanySettingEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateCompanySettingDto,
  ): Promise<CompanySettingEntity> {
    return this.companySettingsService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Remove as configurações da empresa (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.companySettingsService.remove(id);
  }
}
