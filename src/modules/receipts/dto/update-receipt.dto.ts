import { PartialType } from '@nestjs/swagger';
import { CreateReceiptDto } from './create-receipt.dto';
import { BooleanValidator } from 'src/common/validators';

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true,
  })
  active?: boolean;

  @BooleanValidator({
    fieldName: 'reverse',
    label: 'Estornado/Estorno',
    optional: true,
  })
  reverse?: boolean;
}
