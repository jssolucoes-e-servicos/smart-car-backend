import { PartialType } from '@nestjs/swagger';
import { CreateCompanySettingDto } from './create-company-setting.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateCompanySettingDto extends PartialType(CreateCompanySettingDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
