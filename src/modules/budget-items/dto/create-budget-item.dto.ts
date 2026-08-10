import { StringValidator, NumberValidator, BooleanValidator } from 'src/common/validators';

export class CreateBudgetItemDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'budgetId',
    label: 'ID do Orçamento',
    exemple: 'bud-123',
  })
  budgetId: string;

  @StringValidator({
    fieldName: 'serviceName',
    label: 'Nome do Serviço Relacionado',
    exemple: 'Troca de Óleo',
  })
  serviceName: string;

  @NumberValidator({
    fieldName: 'serviceValue',
    label: 'Valor Padrão do Serviço',
    min: 0,
    exemple: 150.00,
  })
  serviceValue: number;

  @NumberValidator({
    fieldName: 'suggestValue',
    label: 'Valor Sugerido',
    optional: true,
    min: 0,
    exemple: 180.00,
  })
  suggestValue?: number;

  @StringValidator({
    fieldName: 'referenceId',
    label: 'ID de Referência do Serviço',
    optional: true,
    exemple: 'srv-123',
  })
  referenceId?: string;

  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Item (Ex: Peça ou Adicional)',
    exemple: 'Pastilha de Freio Cobreq',
  })
  name: string;

  @NumberValidator({
    fieldName: 'value',
    label: 'Valor do Item cobrado',
    min: 0,
    exemple: 120.00,
  })
  value: number;

  @BooleanValidator({
    fieldName: 'removed',
    label: 'Removido',
    optional: true,
  })
  removed?: boolean;
}
