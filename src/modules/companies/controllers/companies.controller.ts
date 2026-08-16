import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';
import { PublicRoute } from 'src/common/decorators/routes/public-route.decorator';

@ApiTags('Empresas (Oficinas)')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @PublicRoute('GET', 'cnpj/:cnpj', {
    summary: 'Busca dados de uma empresa ativa pelo CNPJ (Rota Pública)',
    responseType: CompanyEntity,
  })
  async findByCnpj(@Param('cnpj') cnpj: string): Promise<CompanyEntity> {
    return this.companiesService.findByCnpj(cnpj);
  }

  @ProtectedRoute('GET', '', {
    summary: 'Lista todas as empresas ativas',
    responseType: [CompanyEntity],
  })
  async findAll(): Promise<CompanyEntity[]> {
    return this.companiesService.findAllActive();
  }

  @ProtectedRoute('GET', ':id', {
    summary: 'Busca detalhes de uma empresa por ID',
    responseType: CompanyEntity,
  })
  async findOne(@Param() { id }: IdParamDto): Promise<CompanyEntity> {
    return this.companiesService.findById(id);
  }

  @ProtectedRoute('POST', '', {
    summary: 'Cria uma nova empresa',
    responseType: CompanyEntity,
  })
  async create(@Body() dto: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companiesService.create(dto);
  }

  @ProtectedRoute('PATCH', ':id', {
    summary: 'Atualiza dados de uma empresa existente',
    responseType: CompanyEntity,
  })
  async update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companiesService.update(id, dto);
  }

  @ProtectedRoute('DELETE', ':id', {
    summary: 'Inativa/Remove uma empresa (Soft Delete)',
  })
  async remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.companiesService.remove(id);
  }
}
