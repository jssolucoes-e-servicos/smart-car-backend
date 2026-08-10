import { PartialType } from '@nestjs/swagger';
import { CreateBudgetDto } from './create-budget.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
