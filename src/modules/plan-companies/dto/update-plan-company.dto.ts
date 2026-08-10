import { PartialType } from '@nestjs/swagger';
import { CreatePlanCompanyDto } from './create-plan-company.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdatePlanCompanyDto extends PartialType(CreatePlanCompanyDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;

  @BooleanValidator({
    fieldName: 'expired',
    label: 'Expirado',
    optional: true,
  })
  expired?: boolean;
}
