import { PartialType } from '@nestjs/swagger';
import { CreateBudgetItemDto } from './create-budget-item.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateBudgetItemDto extends PartialType(CreateBudgetItemDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
