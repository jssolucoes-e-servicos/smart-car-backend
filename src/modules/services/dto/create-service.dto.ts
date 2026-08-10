import { StringValidator, NumberValidator } from 'src/common/validators';

export class CreateServiceDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Serviço',
    minLength: 3,
    exemple: 'Troca de Óleo',
  })
  name: string;

  @StringValidator({
    fieldName: 'description',
    label: 'Descrição do Serviço',
    optional: true,
    exemple: 'Troca de óleo do motor e substituição de filtro',
  })
  description?: string;

  @NumberValidator({
    fieldName: 'value',
    label: 'Preço/Valor Base do Serviço',
    min: 0,
    exemple: 150.00,
  })
  value: number;
}
