import { StringValidator, NumberValidator, BooleanValidator, EnumValidator } from 'src/common/validators';

export class CreateBudgetPaymentDto {
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

  @NumberValidator({
    fieldName: 'amount',
    label: 'Valor Pago',
    min: 0,
    exemple: 250.00,
  })
  amount: number;

  @EnumValidator({
    fieldName: 'method',
    label: 'Forma de Pagamento',
    enumType: {
      PIX_OFFLINE: 'PIX_OFFLINE',
      PIX_ONLINE: 'PIX_ONLINE',
      CARD_DEBIT: 'CARD_DEBIT',
      CARD_CREDIT: 'CARD_CREDIT',
      CARD_LINK: 'CARD_LINK',
      MONEY: 'MONEY',
      OTHER: 'OTHER',
    },
    optional: true,
    exemple: 'CARD_CREDIT',
  })
  method?: 'PIX_OFFLINE' | 'PIX_ONLINE' | 'CARD_DEBIT' | 'CARD_CREDIT' | 'CARD_LINK' | 'MONEY' | 'OTHER';

  @StringValidator({
    fieldName: 'externalId',
    label: 'ID de Transação Externo',
    optional: true,
    exemple: 'ext-payment-123',
  })
  externalId?: string;

  @StringValidator({
    fieldName: 'externalMeta',
    label: 'Metadados da Transação Externa',
    optional: true,
    exemple: '{}',
  })
  externalMeta?: string;

  @BooleanValidator({
    fieldName: 'forCustomer',
    label: 'Enviado para o Cliente',
    optional: true,
  })
  forCustomer?: boolean;

  @StringValidator({
    fieldName: 'userId',
    label: 'ID do Usuário Receptor',
    optional: true,
    exemple: 'usr-123',
  })
  userId?: string;
}
