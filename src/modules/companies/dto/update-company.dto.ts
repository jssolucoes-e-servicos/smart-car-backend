import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
