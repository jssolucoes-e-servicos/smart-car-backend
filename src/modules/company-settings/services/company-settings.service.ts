import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreateCompanySettingDto } from '../dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from '../dto/update-company-setting.dto';
import { CompanySettingEntity } from 'src/common/entities';

@Injectable()
export class CompanySettingsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCompanySettingDto): Promise<CompanySettingEntity> {
    const existing = await this.prisma.companySetting.findFirst({
      where: { companyId: dto.companyId, active: true },
    });
    if (existing) {
      throw new ConflictException(`Esta empresa já possui configurações cadastradas.`);
    }

    const companySetting = await this.prisma.companySetting.create({
      data: {
        companyId: dto.companyId,
        themeColor: dto.themeColor || '#000000',
        mercadoPagoKey: dto.mercadoPagoKey,
        mercadoPagoToken: dto.mercadoPagoToken,
        mercadoPagoMode: dto.mercadoPagoMode || 'TEST',
        mercadoPagoEmail: dto.mercadoPagoEmail,
        pixKey: dto.pixKey,
        usingEmail: dto.usingEmail ?? false,
        emailHost: dto.emailHost,
        emailUser: dto.emailUser,
        emailPassword: dto.emailPassword,
        emailPort: dto.emailPort,
      },
    });

    return new CompanySettingEntity(companySetting as unknown as Partial<CompanySettingEntity>);
  }

  async findByCompanyId(companyId: string): Promise<CompanySettingEntity> {
    const companySetting = await this.prisma.companySetting.findFirst({
      where: { companyId, active: true, deletedAt: null },
    });

    if (!companySetting) {
      throw new NotFoundException(`Configurações para a empresa de ID '${companyId}' não foram localizadas.`);
    }

    return new CompanySettingEntity(companySetting as unknown as Partial<CompanySettingEntity>);
  }

  async findById(id: string): Promise<CompanySettingEntity> {
    const companySetting = await this.prisma.companySetting.findFirst({
      where: { id, deletedAt: null },
    });

    if (!companySetting) {
      throw new NotFoundException(`Configuração com ID '${id}' não foi localizada.`);
    }

    return new CompanySettingEntity(companySetting as unknown as Partial<CompanySettingEntity>);
  }

  async update(id: string, dto: UpdateCompanySettingDto): Promise<CompanySettingEntity> {
    await this.findById(id);

    const updated = await this.prisma.companySetting.update({
      where: { id },
      data: dto,
    });

    return new CompanySettingEntity(updated as unknown as Partial<CompanySettingEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.companySetting.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }
}
