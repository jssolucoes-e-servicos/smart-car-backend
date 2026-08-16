import { StringValidator, NumberValidator, BooleanValidator, EnumValidator, NestedValidator } from 'src/common/validators';

export class CreateBudgetNestedItemDto {
  @StringValidator({
    fieldName: 'id',
    label: 'ID do Item',
    optional: true,
    exemple: 'item-123',
  })
  id?: string;

  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Item',
    exemple: 'Pastilha de Freio',
  })
  name: string;

  @NumberValidator({
    fieldName: 'value',
    label: 'Valor',
    min: 0,
    exemple: 150.00,
  })
  value: number;

  @StringValidator({
    fieldName: 'serviceName',
    label: 'Nome do Serviço',
    optional: true,
    exemple: 'Serviço de Freio',
  })
  serviceName?: string;

  @NumberValidator({
    fieldName: 'serviceValue',
    label: 'Valor do Serviço',
    optional: true,
    min: 0,
    exemple: 150.00,
  })
  serviceValue?: number;

  @NumberValidator({
    fieldName: 'suggestValue',
    label: 'Valor Sugerido',
    optional: true,
    min: 0,
    exemple: 150.00,
  })
  suggestValue?: number;
}

export class CreateBudgetDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'customerName',
    label: 'Nome do Cliente',
    minLength: 3,
    exemple: 'Carlos Silva',
  })
  customerName: string;

  @StringValidator({
    fieldName: 'document',
    label: 'CPF/CNPJ do Cliente',
    optional: true,
    exemple: '12345678909',
  })
  document?: string;

  @StringValidator({
    fieldName: 'phone',
    label: 'Telefone',
    optional: true,
    exemple: '51999999999',
  })
  phone?: string;

  @StringValidator({
    fieldName: 'email',
    label: 'E-mail',
    optional: true,
    exemple: 'carlos@gmail.com',
  })
  email?: string;

  @StringValidator({
    fieldName: 'zipCode',
    label: 'CEP',
    optional: true,
    exemple: '90000000',
  })
  zipCode?: string;

  @StringValidator({
    fieldName: 'publicPlace',
    label: 'Logradouro',
    optional: true,
    exemple: 'Av Protásio Alves',
  })
  publicPlace?: string;

  @StringValidator({
    fieldName: 'number',
    label: 'Número',
    optional: true,
    exemple: '450',
  })
  number?: string;

  @StringValidator({
    fieldName: 'complement',
    label: 'Complemento',
    optional: true,
    exemple: 'Apto 302',
  })
  complement?: string;

  @StringValidator({
    fieldName: 'neighborhood',
    label: 'Bairro',
    optional: true,
    exemple: 'Petrópolis',
  })
  neighborhood?: string;

  @StringValidator({
    fieldName: 'city',
    label: 'Cidade',
    optional: true,
    exemple: 'Porto Alegre',
  })
  city?: string;

  @StringValidator({
    fieldName: 'brand',
    label: 'Marca do Veículo',
    exemple: 'Chevrolet',
  })
  brand: string;

  @StringValidator({
    fieldName: 'model',
    label: 'Modelo do Veículo',
    exemple: 'Onix',
  })
  model: string;

  @StringValidator({
    fieldName: 'plate',
    label: 'Placa',
    exemple: 'IXO9B88',
  })
  plate: string;

  @StringValidator({
    fieldName: 'year',
    label: 'Ano',
    optional: true,
    exemple: '2020',
  })
  year?: string;

  @StringValidator({
    fieldName: 'km',
    label: 'Quilometragem',
    optional: true,
    exemple: '45000',
  })
  km?: string;

  @StringValidator({
    fieldName: 'description',
    label: 'Descrição / Observações',
    optional: true,
    exemple: 'Revisão geral de 40k km',
  })
  description?: string;

  @NumberValidator({
    fieldName: 'totalValue',
    label: 'Valor Total',
    min: 0,
    exemple: 450.00,
  })
  totalValue: number;

  @EnumValidator({
    fieldName: 'status',
    label: 'Status do Orçamento',
    enumType: {
      PENDENT: 'PENDENT',
      APPROVED: 'APPROVED',
      REJECTED: 'REJECTED',
      IN_PROGRESS: 'IN_PROGRESS',
      WAITING_PARTS: 'WAITING_PARTS',
      COMPLETED: 'COMPLETED',
      CANCELED: 'CANCELED',
    },
    optional: true,
    exemple: 'PENDENT',
  })
  status?: 'PENDENT' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'COMPLETED' | 'CANCELED';

  @BooleanValidator({
    fieldName: 'approved',
    label: 'Aprovado',
    optional: true,
  })
  approved?: boolean;

  @NestedValidator({
    fieldName: 'items',
    label: 'Itens do Orçamento',
    optional: true,
    isArray: true,
    dto: CreateBudgetNestedItemDto,
  })
  items?: CreateBudgetNestedItemDto[];
}
