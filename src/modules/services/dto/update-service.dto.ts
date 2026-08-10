import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
