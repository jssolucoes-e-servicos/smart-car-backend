import { StringValidator, NumberValidator, BooleanValidator, EnumValidator } from 'src/common/validators';

export class CreateReceiptDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'budgetId',
    label: 'ID do Orçamento Relacionado',
    optional: true,
    exemple: 'bud-123',
  })
  budgetId?: string;

  @StringValidator({
    fieldName: 'recipientName',
    label: 'Nome do Destinatário/Emissor',
    minLength: 3,
    exemple: 'Carlos Silva',
  })
  recipientName: string;

  @StringValidator({
    fieldName: 'document',
    label: 'CPF/CNPJ do Destinatário',
    exemple: '12345678909',
  })
  document: string;

  @EnumValidator({
    fieldName: 'receiptType',
    label: 'Tipo de Recibo',
    enumType: {
      IN: 'IN',
      OUT: 'OUT',
    },
    optional: true,
    exemple: 'IN',
  })
  receiptType?: 'IN' | 'OUT';

  @StringValidator({
    fieldName: 'valueExtense',
    label: 'Valor por Extenso',
    exemple: 'Duzentos e cinquenta reais',
  })
  valueExtense: string;

  @StringValidator({
    fieldName: 'description',
    label: 'Descrição',
    exemple: 'Recebimento de parcela de orçamento',
  })
  description: string;

  @EnumValidator({
    fieldName: 'paymentMethod',
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
  paymentMethod?: 'PIX_OFFLINE' | 'PIX_ONLINE' | 'CARD_DEBIT' | 'CARD_CREDIT' | 'CARD_LINK' | 'MONEY' | 'OTHER';

  @NumberValidator({
    fieldName: 'value',
    label: 'Valor do Recibo',
    min: 0,
    exemple: 250.00,
  })
  value: number;

  @StringValidator({
    fieldName: 'userId',
    label: 'ID do Usuário Criador',
    optional: true,
    exemple: 'usr-123',
  })
  userId?: string;
}
