import { PartialType } from '@nestjs/swagger';
import { CreateBudgetPaymentDto } from './create-budget-payment.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateBudgetPaymentDto extends PartialType(CreateBudgetPaymentDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
