import { Controller, Body, Param, Post, UseInterceptors, UploadedFile, BadRequestException, Headers, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from 'src/common/entities';
import { IdParamDto } from 'src/common/dto/id.param.dto';
import { ProtectedRoute } from 'src/common/decorators/routes/protected-route.decorator';
import { PublicRoute } from 'src/common/decorators/routes/public-route.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../s3/services/s3.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@ApiTags('Empresas (Oficinas)')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('backup')
  @PublicRoute('POST', 'backup', {
    summary: 'Recebe o backup do banco de dados local do Electron e envia para o MinIO (Rota Pública)',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadBackup(
    @UploadedFile() file: any,
    @Headers('x-company-hash') companyHash?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo de backup não enviado.');
    }

    if (!companyHash) {
      throw new BadRequestException('Cabeçalho x-company-hash ausente.');
    }

    const company = await this.prisma.company.findFirst({
      where: { hash: companyHash, active: true, deletedAt: null },
    });

    if (!company) {
      throw new NotFoundException('Empresa não cadastrada ou inativa.');
    }

    try {
      const s3Key = `backups/${company.id}/flexcar.zip`;

      // Envia o novo backup para o MinIO (sobrescrevendo o anterior automaticamente)
      await this.s3Service.uploadFile(s3Key, file.buffer, 'application/zip');

      return { message: 'Backup enviado e atualizado com sucesso no MinIO.', path: s3Key };
    } catch (error: any) {
      console.error('Erro ao processar backup no backend:', error);
      throw new BadRequestException(`Erro ao processar backup: ${error.message || error}`);
    }
  }

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
