import { StringValidator, NumberValidator, DateValidator, EnumValidator } from 'src/common/validators';

export class CreateCompanyInvoiceDto {
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

  @StringValidator({
    fieldName: 'reference',
    label: 'Referência (Mês/Ano)',
    exemple: '2026-08',
  })
  reference: string;

  @NumberValidator({
    fieldName: 'amount',
    label: 'Valor da Fatura',
    min: 0,
    exemple: 149.90,
  })
  amount: number;

  @DateValidator({
    fieldName: 'dueDate',
    label: 'Data de Vencimento',
    exemple: '2026-08-15T00:00:00.000Z',
  })
  dueDate: Date;

  @EnumValidator({
    fieldName: 'paymentMethod',
    label: 'Método de Pagamento da Fatura',
    enumType: {
      PIX: 'PIX',
      CREDIT_CARD: 'CREDIT_CARD',
      INVOICE: 'INVOICE',
    },
    optional: true,
    exemple: 'PIX',
  })
  paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'INVOICE';

  @EnumValidator({
    fieldName: 'invoiceStatus',
    label: 'Status da Fatura',
    enumType: {
      PENDING: 'PENDING',
      PAID: 'PAID',
      CANCELED: 'CANCELED',
      OVERDUE: 'OVERDUE',
      REFUNDED: 'REFUNDED',
    },
    optional: true,
    exemple: 'PENDING',
  })
  invoiceStatus?: 'PENDING' | 'PAID' | 'CANCELED' | 'OVERDUE' | 'REFUNDED';
}
