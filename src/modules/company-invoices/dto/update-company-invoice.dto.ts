import { PartialType } from '@nestjs/swagger';
import { CreateCompanyInvoiceDto } from './create-company-invoice.dto';
import { BooleanValidator, DateValidator } from 'src/common/validators';

export class UpdateCompanyInvoiceDto extends PartialType(CreateCompanyInvoiceDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;

  @BooleanValidator({
    fieldName: 'paid',
    label: 'Pago',
    optional: true,
  })
  paid?: boolean;

  @DateValidator({
    fieldName: 'paidAt',
    label: 'Data do Pagamento',
    optional: true,
  })
  paidAt?: Date;
}
