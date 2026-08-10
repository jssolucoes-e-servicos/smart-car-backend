import { CuidValidator } from 'src/common/validators';

export class IdParamDto {
  @CuidValidator({
    fieldName: 'id',
    label: 'ID do registro',
  })
  id: string;
}