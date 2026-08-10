import { PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
