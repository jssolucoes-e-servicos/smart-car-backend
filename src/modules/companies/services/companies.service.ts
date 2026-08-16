import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from 'src/common/entities';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const existingCnpj = await this.prisma.company.findFirst({
      where: { cnpj: dto.cnpj },
    });
    if (existingCnpj) {
      throw new ConflictException(`Já existe uma empresa cadastrada com o CNPJ '${dto.cnpj}'.`);
    }

    const company = await this.prisma.company.create({
      data: {
        name: dto.name,
        fantasy: dto.fantasy,
        cnpj: dto.cnpj,
        ie: dto.ie,
        phone: dto.phone,
        email: dto.email,
        addressInLine: dto.addressInLine,
        zipCode: dto.zipCode,
        publicPlace: dto.publicPlace,
        number: dto.number,
        complement: dto.complement || '',
        neighborhood: dto.neighborhood,
        city: dto.city,
        state: dto.state,
        logo: dto.logo || '',
      },
    });

    return new CompanyEntity(company as unknown as Partial<CompanyEntity>);
  }

  async findAllActive(): Promise<CompanyEntity[]> {
    const companies = await this.prisma.company.findMany({
      where: { active: true, deletedAt: null },
      orderBy: { name: 'asc' },
    });

    return companies.map((c) => new CompanyEntity(c as unknown as Partial<CompanyEntity>));
  }

  async findById(id: string): Promise<CompanyEntity> {
    const company = await this.prisma.company.findFirst({
      where: { id, deletedAt: null },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com ID '${id}' não foi localizada.`);
    }

    return new CompanyEntity(company as unknown as Partial<CompanyEntity>);
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<CompanyEntity> {
    await this.findById(id);

    if (dto.cnpj) {
      const existingCnpj = await this.prisma.company.findFirst({
        where: { cnpj: dto.cnpj, NOT: { id } },
      });
      if (existingCnpj) {
        throw new ConflictException(`O CNPJ '${dto.cnpj}' já está cadastrado em outra empresa.`);
      }
    }

    const updated = await this.prisma.company.update({
      where: { id },
      data: dto,
    });

    return new CompanyEntity(updated as unknown as Partial<CompanyEntity>);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.company.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }

  async findByCnpj(cnpj: string): Promise<CompanyEntity> {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    const company = await this.prisma.company.findFirst({
      where: {
        cnpj: {
          contains: cleanCnpj,
        },
        active: true,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ '${cnpj}' não foi localizada ou está inativa.`);
    }

    return new CompanyEntity(company as unknown as Partial<CompanyEntity>);
  }
}
