import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;
}
