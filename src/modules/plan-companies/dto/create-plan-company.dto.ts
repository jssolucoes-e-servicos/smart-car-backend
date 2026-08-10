import { StringValidator, BooleanValidator, NumberValidator, EnumValidator } from 'src/common/validators';

export class CreatePlanCompanyDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'planId',
    label: 'ID do Plano',
    exemple: 'plan-123',
  })
  planId: string;

  @BooleanValidator({
    fieldName: 'isTrial',
    label: 'É Período de Teste',
    optional: true,
  })
  isTrial?: boolean;

  @EnumValidator({
    fieldName: 'paymentFrequency',
    label: 'Frequência de Pagamento',
    enumType: {
      MONTHLY: 'MONTHLY',
      BIANNUAL: 'BIANNUAL',
      ANNUAL: 'ANNUAL',
    },
    optional: true,
    exemple: 'MONTHLY',
  })
  paymentFrequency?: 'MONTHLY' | 'BIANNUAL' | 'ANNUAL';

  @NumberValidator({
    fieldName: 'dueDate',
    label: 'Dia de Vencimento',
    optional: true,
    min: 1,
    exemple: 15,
  })
  dueDate?: number;

  @EnumValidator({
    fieldName: 'paymentMethod',
    label: 'Método de Pagamento do Plano',
    enumType: {
      PIX: 'PIX',
      CREDIT_CARD: 'CREDIT_CARD',
      INVOICE: 'INVOICE',
    },
    optional: true,
    exemple: 'PIX',
  })
  paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'INVOICE';
}
